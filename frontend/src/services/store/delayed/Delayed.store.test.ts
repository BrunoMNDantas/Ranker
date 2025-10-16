import DelayedStore from "./Delayed.store";
import Store, { Entity } from "../Store";

interface TestEntity extends Entity {
  id: string;
  name: string;
  value: number;
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

describe("DelayedStore", () => {

  let mockStore: MockStore<TestEntity>;
  let delayedStore: DelayedStore<TestEntity>;
  const DELAY_MS = 50;

  beforeEach(() => {
    mockStore = new MockStore<TestEntity>();
    delayedStore = new DelayedStore<TestEntity>(mockStore, DELAY_MS);
  });

  describe("constructor", () => {

    it("should store source store reference", () => {
      expect(delayedStore.sourceStore).toBe(mockStore);
    });

    it("should store delay value", () => {
      expect(delayedStore.delay).toBe(DELAY_MS);
    });

    it("should accept different delay values", () => {
      const store1 = new DelayedStore<TestEntity>(mockStore, 100);
      const store2 = new DelayedStore<TestEntity>(mockStore, 500);

      expect(store1.delay).toBe(100);
      expect(store2.delay).toBe(500);
    });

  });

  describe("execute", () => {

    it("should delay execution by specified milliseconds", async () => {
      const startTime = Date.now();
      const result = await delayedStore.execute(() => Promise.resolve("test"));
      const endTime = Date.now();
      const elapsed = endTime - startTime;

      expect(elapsed).toBeGreaterThanOrEqual(DELAY_MS);
    });

    it("should return the result from the function", async () => {
      const result = await delayedStore.execute(() => Promise.resolve(42));
      expect(result).toBe(42);
    });

    it("should propagate errors from the function", async () => {
      const errorFunc = async () => {
        throw new Error("TEST_ERROR");
      };

      try {
        await delayedStore.execute(errorFunc);
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toBe("TEST_ERROR");
      }
    });

    it("should handle rejected promises", async () => {
      const rejectFunc = () => Promise.reject(new Error("REJECTED"));

      try {
        await delayedStore.execute(rejectFunc);
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toBe("REJECTED");
      }
    });

  });

  describe("getAll", () => {

    it("should delegate to source store after delay", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100 };
      await mockStore.create(entity);

      const startTime = Date.now();
      const result = await delayedStore.getAll();
      const elapsed = Date.now() - startTime;

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(entity);
      expect(elapsed).toBeGreaterThanOrEqual(DELAY_MS);
    });

    it("should return empty array when store is empty", async () => {
      const result = await delayedStore.getAll();
      expect(result).toEqual([]);
    });

  });

  describe("get", () => {

    it("should delegate to source store after delay", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100 };
      await mockStore.create(entity);

      const startTime = Date.now();
      const result = await delayedStore.get("1");
      const elapsed = Date.now() - startTime;

      expect(result).toEqual(entity);
      expect(elapsed).toBeGreaterThanOrEqual(DELAY_MS);
    });

    it("should return null when entity does not exist", async () => {
      const result = await delayedStore.get("non-existent");
      expect(result).toBeNull();
    });

  });

  describe("getByIds", () => {

    it("should delegate to source store after delay", async () => {
      const entity1: TestEntity = { id: "1", name: "Test 1", value: 100 };
      const entity2: TestEntity = { id: "2", name: "Test 2", value: 200 };
      await mockStore.create(entity1);
      await mockStore.create(entity2);

      const startTime = Date.now();
      const result = await delayedStore.getByIds(["1", "2"]);
      const elapsed = Date.now() - startTime;

      expect(result).toHaveLength(2);
      expect(result).toEqual([entity1, entity2]);
      expect(elapsed).toBeGreaterThanOrEqual(DELAY_MS);
    });

    it("should filter out non-existent ids", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100 };
      await mockStore.create(entity);

      const result = await delayedStore.getByIds(["1", "non-existent"]);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(entity);
    });

    it("should handle empty ids array", async () => {
      const result = await delayedStore.getByIds([]);
      expect(result).toEqual([]);
    });

  });

  describe("create", () => {

    it("should delegate to source store after delay", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100 };

      const startTime = Date.now();
      const id = await delayedStore.create(entity);
      const elapsed = Date.now() - startTime;

      expect(id).toBe("1");
      expect(elapsed).toBeGreaterThanOrEqual(DELAY_MS);
    });

    it("should persist entity in source store", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100 };

      await delayedStore.create(entity);
      const retrieved = await mockStore.get("1");

      expect(retrieved).toEqual(entity);
    });

    it("should propagate errors from source store", async () => {
      const entity1: TestEntity = { id: "1", name: "Test", value: 100 };
      await delayedStore.create(entity1);

      const entity2: TestEntity = { id: "1", name: "Duplicate", value: 200 };

      try {
        await delayedStore.create(entity2);
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toBe("DUPLICATE_ENTITY");
      }
    });

    it("should apply delay even when error occurs", async () => {
      const entity1: TestEntity = { id: "1", name: "Test", value: 100 };
      await delayedStore.create(entity1);

      const entity2: TestEntity = { id: "1", name: "Duplicate", value: 200 };
      const startTime = Date.now();

      try {
        await delayedStore.create(entity2);
      } catch (error) {
        const elapsed = Date.now() - startTime;
        expect(elapsed).toBeGreaterThanOrEqual(DELAY_MS);
      }
    });

  });

  describe("update", () => {

    it("should delegate to source store after delay", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100 };
      await mockStore.create(entity);

      entity.name = "Updated";
      const startTime = Date.now();
      await delayedStore.update(entity);
      const elapsed = Date.now() - startTime;

      expect(elapsed).toBeGreaterThanOrEqual(DELAY_MS);
    });

    it("should update entity in source store", async () => {
      const entity: TestEntity = { id: "1", name: "Original", value: 100 };
      await mockStore.create(entity);

      entity.name = "Updated";
      entity.value = 200;
      await delayedStore.update(entity);

      const retrieved = await mockStore.get("1");
      expect(retrieved?.name).toBe("Updated");
      expect(retrieved?.value).toBe(200);
    });

    it("should propagate errors from source store", async () => {
      const entity: TestEntity = { id: "non-existent", name: "Test", value: 100 };

      try {
        await delayedStore.update(entity);
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toBe("NON_EXISTENT_ENTITY");
      }
    });

  });

  describe("delete", () => {~

    it("should delegate to source store after delay", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100 };
      await mockStore.create(entity);

      const startTime = Date.now();
      await delayedStore.delete("1");
      const elapsed = Date.now() - startTime;

      expect(elapsed).toBeGreaterThanOrEqual(DELAY_MS);
    });

    it("should remove entity from source store", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100 };
      await mockStore.create(entity);

      await delayedStore.delete("1");
      const retrieved = await mockStore.get("1");

      expect(retrieved).toBeNull();
    });

    it("should not throw error when deleting non-existent entity", async () => {
      await expect(delayedStore.delete("non-existent")).resolves.not.toThrow();
    });

  });

  describe("concurrent operations", () => {

    it("should handle multiple concurrent delayed operations", async () => {
      const entities: TestEntity[] = [
        { id: "1", name: "Entity 1", value: 100 },
        { id: "2", name: "Entity 2", value: 200 },
        { id: "3", name: "Entity 3", value: 300 }
      ];

      const startTime = Date.now();
      const promises = entities.map(e => delayedStore.create(e));
      await Promise.all(promises);
      const elapsed = Date.now() - startTime;

      // All should start delay at roughly the same time
      expect(elapsed).toBeGreaterThanOrEqual(DELAY_MS);
      expect(elapsed).toBeLessThan(DELAY_MS * 2); // Should not be sequential

      const all = await mockStore.getAll();
      expect(all).toHaveLength(3);
    });

  });

  describe("different delay values", () => {

    it("should respect zero delay", async () => {
      const fastStore = new DelayedStore<TestEntity>(mockStore, 0);
      const entity: TestEntity = { id: "1", name: "Test", value: 100 };

      const startTime = Date.now();
      await fastStore.create(entity);
      const elapsed = Date.now() - startTime;

      expect(elapsed).toBeLessThan(20); // Should be nearly instant
    });

    it("should respect longer delays", async () => {
      const slowStore = new DelayedStore<TestEntity>(mockStore, 100);
      const entity: TestEntity = { id: "1", name: "Test", value: 100 };

      const startTime = Date.now();
      await slowStore.create(entity);
      const elapsed = Date.now() - startTime;

      expect(elapsed).toBeGreaterThanOrEqual(100);
    });

  });

});