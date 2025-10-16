import EntityStore, { Entity, DEFAULT_ID_GENERATOR } from "./Entity.store";
import Store from "../Store";

interface TestEntity extends Entity {
  id: string;
  name: string;
  value: number;
  creationDate: Date;
  lastUpdateDate: Date;
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

describe("EntityStore", () => {

  let mockStore: MockStore<TestEntity>;
  let entityStore: EntityStore<TestEntity>;

  beforeEach(() => {
    mockStore = new MockStore<TestEntity>();
    entityStore = new EntityStore<TestEntity>(mockStore);
  });

  describe("constructor", () => {

    it("should store source store reference", () => {
      expect(entityStore.sourceStore).toBe(mockStore);
    });

    it("should use default ID generator when not provided", () => {
      const store = new EntityStore<TestEntity>(mockStore);
      expect(store.idGenerator).toBeDefined();
    });

    it("should use custom ID generator when provided", () => {
      const customGenerator = (entity: TestEntity) => `custom-${entity.name}`;
      const store = new EntityStore<TestEntity>(mockStore, customGenerator);
      expect(store.idGenerator).toBe(customGenerator);
    });

  });

  describe("getAll", () => {

    it("should delegate to source store", async () => {
      const entity: TestEntity = {
        id: "1",
        name: "Test",
        value: 100,
        creationDate: new Date(),
        lastUpdateDate: new Date()
      };
      await mockStore.create(entity);

      const result = await entityStore.getAll();

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(entity);
    });

    it("should return empty array when store is empty", async () => {
      const result = await entityStore.getAll();
      expect(result).toEqual([]);
    });

  });

  describe("get", () => {

    it("should delegate to source store", async () => {
      const entity: TestEntity = {
        id: "1",
        name: "Test",
        value: 100,
        creationDate: new Date(),
        lastUpdateDate: new Date()
      };
      await mockStore.create(entity);

      const result = await entityStore.get("1");

      expect(result).toEqual(entity);
    });

    it("should return null when entity does not exist", async () => {
      const result = await entityStore.get("non-existent");
      expect(result).toBeNull();
    });

  });

  describe("getByIds", () => {

    it("should delegate to source store", async () => {
      const entity1: TestEntity = {
        id: "1",
        name: "Test 1",
        value: 100,
        creationDate: new Date(),
        lastUpdateDate: new Date()
      };
      const entity2: TestEntity = {
        id: "2",
        name: "Test 2",
        value: 200,
        creationDate: new Date(),
        lastUpdateDate: new Date()
      };
      await mockStore.create(entity1);
      await mockStore.create(entity2);

      const result = await entityStore.getByIds(["1", "2"]);

      expect(result).toHaveLength(2);
      expect(result).toEqual([entity1, entity2]);
    });

    it("should filter out non-existent ids", async () => {
      const entity: TestEntity = {
        id: "1",
        name: "Test",
        value: 100,
        creationDate: new Date(),
        lastUpdateDate: new Date()
      };
      await mockStore.create(entity);

      const result = await entityStore.getByIds(["1", "non-existent"]);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(entity);
    });

  });

  describe("create", () => {

    it("should generate ID using default generator", async () => {
      const entity: TestEntity = {
        id: "",
        name: "Test",
        value: 100,
        creationDate: new Date(0),
        lastUpdateDate: new Date(0)
      };

      const id = await entityStore.create(entity);

      expect(id).toBeTruthy();
      expect(entity.id).toBe(id);
      expect(entity.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });

    it("should generate ID using custom generator", async () => {
      const customGenerator = (entity: TestEntity) => `custom-${entity.name}`;
      const store = new EntityStore<TestEntity>(mockStore, customGenerator);

      const entity: TestEntity = {
        id: "",
        name: "Test",
        value: 100,
        creationDate: new Date(0),
        lastUpdateDate: new Date(0)
      };

      const id = await store.create(entity);

      expect(id).toBe("custom-Test");
      expect(entity.id).toBe("custom-Test");
    });

    it("should set creationDate to current date", async () => {
      const entity: TestEntity = {
        id: "",
        name: "Test",
        value: 100,
        creationDate: new Date(0),
        lastUpdateDate: new Date(0)
      };

      const beforeCreate = new Date();
      await entityStore.create(entity);
      const afterCreate = new Date();

      expect(entity.creationDate.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
      expect(entity.creationDate.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
    });

    it("should set lastUpdateDate equal to creationDate", async () => {
      const entity: TestEntity = {
        id: "",
        name: "Test",
        value: 100,
        creationDate: new Date(0),
        lastUpdateDate: new Date(0)
      };

      await entityStore.create(entity);

      expect(entity.lastUpdateDate).toEqual(entity.creationDate);
      expect(entity.lastUpdateDate.getTime()).toBe(entity.creationDate.getTime());
    });

    it("should overwrite existing ID with generated one", async () => {
      const entity: TestEntity = {
        id: "old-id",
        name: "Test",
        value: 100,
        creationDate: new Date(0),
        lastUpdateDate: new Date(0)
      };

      await entityStore.create(entity);

      expect(entity.id).not.toBe("old-id");
      expect(entity.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });

    it("should persist entity in source store", async () => {
      const entity: TestEntity = {
        id: "",
        name: "Test",
        value: 100,
        creationDate: new Date(0),
        lastUpdateDate: new Date(0)
      };

      const id = await entityStore.create(entity);
      const retrieved = await mockStore.get(id);

      expect(retrieved).not.toBeNull();
      expect(retrieved?.name).toBe("Test");
      expect(retrieved?.value).toBe(100);
    });

    it("should throw error if source store rejects duplicate", async () => {
      const customGenerator = () => "fixed-id";
      const store = new EntityStore<TestEntity>(mockStore, customGenerator);

      const entity1: TestEntity = {
        id: "",
        name: "Test 1",
        value: 100,
        creationDate: new Date(),
        lastUpdateDate: new Date()
      };
      const entity2: TestEntity = {
        id: "",
        name: "Test 2",
        value: 200,
        creationDate: new Date(),
        lastUpdateDate: new Date()
      };

      await store.create(entity1);

      try {
        await store.create(entity2);
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toBe("DUPLICATE_ENTITY");
      }
    });

  });

  describe("update", () => {

    it("should update lastUpdateDate to current date", async () => {
      const entity: TestEntity = {
        id: "",
        name: "Test",
        value: 100,
        creationDate: new Date(0),
        lastUpdateDate: new Date(0)
      };

      await entityStore.create(entity);

      // Wait a bit to ensure different timestamp
      await new Promise(resolve => setTimeout(resolve, 10));

      entity.name = "Updated";
      const beforeUpdate = new Date();
      await entityStore.update(entity);
      const afterUpdate = new Date();

      expect(entity.lastUpdateDate.getTime()).toBeGreaterThanOrEqual(beforeUpdate.getTime());
      expect(entity.lastUpdateDate.getTime()).toBeLessThanOrEqual(afterUpdate.getTime());
    });

    it("should not modify creationDate", async () => {
      const entity: TestEntity = {
        id: "",
        name: "Test",
        value: 100,
        creationDate: new Date(0),
        lastUpdateDate: new Date(0)
      };

      await entityStore.create(entity);
      const originalCreationDate = entity.creationDate;

      await new Promise(resolve => setTimeout(resolve, 10));

      entity.name = "Updated";
      await entityStore.update(entity);

      expect(entity.creationDate).toEqual(originalCreationDate);
    });

    it("should delegate update to source store", async () => {
      const entity: TestEntity = {
        id: "",
        name: "Test",
        value: 100,
        creationDate: new Date(0),
        lastUpdateDate: new Date(0)
      };

      const id = await entityStore.create(entity);
      entity.name = "Updated";
      entity.value = 200;

      await entityStore.update(entity);
      const retrieved = await mockStore.get(id);

      expect(retrieved?.name).toBe("Updated");
      expect(retrieved?.value).toBe(200);
    });

    it("should throw error when updating non-existent entity", async () => {
      const entity: TestEntity = {
        id: "non-existent",
        name: "Test",
        value: 100,
        creationDate: new Date(),
        lastUpdateDate: new Date()
      };

      try {
        await entityStore.update(entity);
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toBe("NON_EXISTENT_ENTITY");
      }
    });

  });

  describe("delete", () => {

    it("should delegate to source store", async () => {
      const entity: TestEntity = {
        id: "",
        name: "Test",
        value: 100,
        creationDate: new Date(0),
        lastUpdateDate: new Date(0)
      };

      const id = await entityStore.create(entity);
      await entityStore.delete(id);
      const retrieved = await mockStore.get(id);

      expect(retrieved).toBeNull();
    });

    it("should not throw error when deleting non-existent entity", async () => {
      await expect(entityStore.delete("non-existent")).resolves.not.toThrow();
    });

  });

  describe("DEFAULT_ID_GENERATOR", () => {

    it("should generate valid UUID", () => {
      const entity: TestEntity = {
        id: "",
        name: "Test",
        value: 100,
        creationDate: new Date(),
        lastUpdateDate: new Date()
      };

      const id = DEFAULT_ID_GENERATOR(entity);

      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });

    it("should generate unique IDs", () => {
      const entity: TestEntity = {
        id: "",
        name: "Test",
        value: 100,
        creationDate: new Date(),
        lastUpdateDate: new Date()
      };

      const id1 = DEFAULT_ID_GENERATOR(entity);
      const id2 = DEFAULT_ID_GENERATOR(entity);

      expect(id1).not.toBe(id2);
    });

  });

});