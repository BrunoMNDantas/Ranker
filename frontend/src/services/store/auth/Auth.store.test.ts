import AuthStore, { Entity } from "./Auth.store";
import Store from "../Store";

interface TestEntity extends Entity {
  id: string;
  name: string;
  value: number;
  ownerId: string;
}

class MockStore<T extends Entity> implements Store<T> {
  private entities: Map<string, T> = new Map();

  async getAll(): Promise<T[]> {
    return Array.from(this.entities.values());
  }

  async get(id: string): Promise<T | null> {
    return this.entities.get(id) || null;
  }

  async getByIds(ids: string[]): Promise<T[]> {
    return ids.map(id => this.entities.get(id)).filter(e => e !== undefined) as T[];
  }

  async create(entity: T): Promise<string> {
    if (this.entities.has(entity.id)) {
      throw new Error("DUPLICATE_ENTITY");
    }
    this.entities.set(entity.id, entity);
    return entity.id;
  }

  async update(entity: T): Promise<void> {
    if (!this.entities.has(entity.id)) {
      throw new Error("NON_EXISTENT_ENTITY");
    }
    this.entities.set(entity.id, entity);
  }

  async delete(id: string): Promise<void> {
    this.entities.delete(id);
  }
}

describe("AuthStore", () => {
  let mockStore: MockStore<TestEntity>;
  let authStore: AuthStore<TestEntity>;
  const CURRENT_USER_ID = "user-123";
  const OWNER_ID_SUPPLIER = () => CURRENT_USER_ID

  beforeEach(() => {
    mockStore = new MockStore<TestEntity>();
    authStore = new AuthStore<TestEntity>(mockStore, OWNER_ID_SUPPLIER);
  });

  describe("constructor", () => {

    it("should store source store reference", () => {
      expect(authStore.sourceStore).toBe(mockStore);
    });

    it("should store ownerIdGetter function", () => {
      expect(authStore.ownerIdGetter).toBe(OWNER_ID_SUPPLIER);
    });

  });

  describe("getAll", () => {

    it("should delegate to source store", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, ownerId: CURRENT_USER_ID };
      await mockStore.create(entity);

      const result = await authStore.getAll();

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(entity);
    });

    it("should return empty array when store is empty", async () => {
      const result = await authStore.getAll();
      expect(result).toEqual([]);
    });

    it("should return entities regardless of ownerId", async () => {
      const entity1: TestEntity = { id: "1", name: "Test 1", value: 100, ownerId: "user-1" };
      const entity2: TestEntity = { id: "2", name: "Test 2", value: 200, ownerId: "user-2" };
      await mockStore.create(entity1);
      await mockStore.create(entity2);

      const result = await authStore.getAll();

      expect(result).toHaveLength(2);
    });

  });

  describe("get", () => {

    it("should delegate to source store", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, ownerId: CURRENT_USER_ID };
      await mockStore.create(entity);

      const result = await authStore.get("1");

      expect(result).toEqual(entity);
    });

    it("should return null when entity does not exist", async () => {
      const result = await authStore.get("non-existent");
      expect(result).toBeNull();
    });

    it("should return entity regardless of ownerId", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, ownerId: "other-user" };
      await mockStore.create(entity);

      const result = await authStore.get("1");

      expect(result).toEqual(entity);
    });

  });

  describe("getByIds", () => {

    it("should delegate to source store", async () => {
      const entity1: TestEntity = { id: "1", name: "Test 1", value: 100, ownerId: CURRENT_USER_ID };
      const entity2: TestEntity = { id: "2", name: "Test 2", value: 200, ownerId: CURRENT_USER_ID };
      await mockStore.create(entity1);
      await mockStore.create(entity2);

      const result = await authStore.getByIds(["1", "2"]);

      expect(result).toHaveLength(2);
      expect(result).toEqual([entity1, entity2]);
    });

    it("should filter out non-existent ids", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, ownerId: CURRENT_USER_ID };
      await mockStore.create(entity);

      const result = await authStore.getByIds(["1", "non-existent"]);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(entity);
    });

    it("should handle empty ids array", async () => {
      const result = await authStore.getByIds([]);
      expect(result).toEqual([]);
    });

  });

  describe("create", () => {

    it("should set ownerId using ownerIdGetter", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, ownerId: "" };

      await authStore.create(entity);

      expect(entity.ownerId).toBe(CURRENT_USER_ID);
    });

    it("should overwrite existing ownerId", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, ownerId: "old-owner" };

      await authStore.create(entity);

      expect(entity.ownerId).toBe(CURRENT_USER_ID);
    });

    it("should persist entity with ownerId in source store", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, ownerId: "" };

      await authStore.create(entity);
      const retrieved = await mockStore.get("1");

      expect(retrieved).not.toBeNull();
      expect(retrieved?.ownerId).toBe(CURRENT_USER_ID);
      expect(retrieved?.name).toBe("Test");
      expect(retrieved?.value).toBe(100);
    });

    it("should call ownerIdGetter with entity", async () => {
      const getterSpy = jest.fn(() => "spy-owner");
      const store = new AuthStore<TestEntity>(mockStore, getterSpy);
      const entity: TestEntity = { id: "1", name: "Test", value: 100, ownerId: "" };

      await store.create(entity);

      expect(getterSpy).toHaveBeenCalledWith(entity);
      expect(getterSpy).toHaveBeenCalledTimes(1);
      expect(entity.ownerId).toBe("spy-owner");
    });

    it("should use dynamic ownerId from getter", async () => {
      let currentOwner = "owner-1";
      const dynamicGetter = () => currentOwner;
      const store = new AuthStore<TestEntity>(mockStore, dynamicGetter);

      const entity1: TestEntity = { id: "1", name: "Test 1", value: 100, ownerId: "" };
      await store.create(entity1);

      currentOwner = "owner-2";
      const entity2: TestEntity = { id: "2", name: "Test 2", value: 200, ownerId: "" };
      await store.create(entity2);

      expect(entity1.ownerId).toBe("owner-1");
      expect(entity2.ownerId).toBe("owner-2");
    });

    it("should return entity id from source store", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, ownerId: "" };

      const id = await authStore.create(entity);

      expect(id).toBe("1");
    });

    it("should propagate errors from source store", async () => {
      const entity1: TestEntity = { id: "1", name: "Test", value: 100, ownerId: "" };
      await authStore.create(entity1);

      const entity2: TestEntity = { id: "1", name: "Duplicate", value: 200, ownerId: "" };

      try {
        await authStore.create(entity2);
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toBe("DUPLICATE_ENTITY");
      }
    });

  });

  describe("update", () => {

    it("should delegate to source store", async () => {
      const entity: TestEntity = { id: "1", name: "Original", value: 100, ownerId: CURRENT_USER_ID };
      await mockStore.create(entity);

      entity.name = "Updated";
      entity.value = 200;
      await authStore.update(entity);

      const retrieved = await mockStore.get("1");
      expect(retrieved?.name).toBe("Updated");
      expect(retrieved?.value).toBe(200);
    });

    it("should not modify ownerId on update", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, ownerId: "original-owner" };
      await mockStore.create(entity);

      entity.name = "Updated";
      entity.ownerId = "should-not-change";
      await authStore.update(entity);

      const retrieved = await mockStore.get("1");
      expect(retrieved?.ownerId).toBe("should-not-change");
    });

    it("should allow updating entity owned by different user", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, ownerId: "other-user" };
      await mockStore.create(entity);

      entity.name = "Updated";
      await authStore.update(entity);

      const retrieved = await mockStore.get("1");
      expect(retrieved?.name).toBe("Updated");
    });

    it("should propagate errors from source store", async () => {
      const entity: TestEntity = { id: "non-existent", name: "Test", value: 100, ownerId: CURRENT_USER_ID };

      try {
        await authStore.update(entity);
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toBe("NON_EXISTENT_ENTITY");
      }
    });

  });

  describe("delete", () => {

    it("should delegate to source store", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, ownerId: CURRENT_USER_ID };
      await mockStore.create(entity);

      await authStore.delete("1");
      const retrieved = await mockStore.get("1");

      expect(retrieved).toBeNull();
    });

    it("should allow deleting entity owned by different user", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, ownerId: "other-user" };
      await mockStore.create(entity);

      await authStore.delete("1");
      const retrieved = await mockStore.get("1");

      expect(retrieved).toBeNull();
    });

    it("should not throw error when deleting non-existent entity", async () => {
      await expect(authStore.delete("non-existent")).resolves.not.toThrow();
    });
  
  });

  describe("integration scenarios", () => {

    it("should handle entities from different owners", async () => {
      let currentOwner = "user-1";
      const dynamicStore = new AuthStore<TestEntity>(mockStore, () => currentOwner);

      const entity1: TestEntity = { id: "1", name: "User 1 Entity", value: 100, ownerId: "" };
      await dynamicStore.create(entity1);

      currentOwner = "user-2";
      const entity2: TestEntity = { id: "2", name: "User 2 Entity", value: 200, ownerId: "" };
      await dynamicStore.create(entity2);

      const all = await dynamicStore.getAll();
      expect(all).toHaveLength(2);
      expect(all.find(e => e.id === "1")?.ownerId).toBe("user-1");
      expect(all.find(e => e.id === "2")?.ownerId).toBe("user-2");
    });

  });

  describe("ownerIdGetter edge cases", () => {

    it("should handle ownerIdGetter that returns empty string", async () => {
      const emptyGetter = () => "";
      const store = new AuthStore<TestEntity>(mockStore, emptyGetter);
      const entity: TestEntity = { id: "1", name: "Test", value: 100, ownerId: "original" };

      await store.create(entity);

      expect(entity.ownerId).toBe("");
    });

    it("should handle ownerIdGetter that throws error", async () => {
      const errorGetter = () => {
        throw new Error("GETTER_ERROR");
      };
      const store = new AuthStore<TestEntity>(mockStore, errorGetter);
      const entity: TestEntity = { id: "1", name: "Test", value: 100, ownerId: "" };

      try {
        await store.create(entity);
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toBe("GETTER_ERROR");
      }
    });

  });

});