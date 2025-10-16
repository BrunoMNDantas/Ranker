import MemoryStore from "./Memory.store";
import { Entity } from "../Store";

interface TestEntity extends Entity {
  id: string;
  name: string;
  value: number;
}

describe("MemoryStore", () => {

  let store: MemoryStore<TestEntity>;
  const mockEntities: TestEntity[] = [
    { id: "1", name: "Entity 1", value: 100 },
    { id: "2", name: "Entity 2", value: 200 },
    { id: "3", name: "Entity 3", value: 300 },
  ];

  beforeEach(() => {
    store = new MemoryStore<TestEntity>([...mockEntities]);
  });

  describe("getAll", () => {

    it("should return all entities", async () => {
      const result = await store.getAll();

      expect(result).toHaveLength(3);
      expect(result).toEqual(mockEntities);
    });

    it("should return cloned entities (not references)", async () => {
      const result = await store.getAll();

      result[0].name = "Modified";

      const secondResult = await store.getAll();
      expect(secondResult[0].name).toBe("Entity 1");
    });

    it("should return empty array when store is empty", async () => {
      const emptyStore = new MemoryStore<TestEntity>([]);
      const result = await emptyStore.getAll();

      expect(result).toEqual([]);
    });

  });

  describe("get", () => {

    it("should return entity by id", async () => {
      const result = await store.get("2");

      expect(result).toEqual({ id: "2", name: "Entity 2", value: 200 });
    });

    it("should return null when entity does not exist", async () => {
      const result = await store.get("non-existent");

      expect(result).toBeNull();
    });

    it("should return cloned entity (not reference)", async () => {
      const result = await store.get("1");

      if (result) {
        result.name = "Modified";
      }

      const secondResult = await store.get("1");
      expect(secondResult?.name).toBe("Entity 1");
    });

  });

  describe("getByIds", () => {

    it("should return multiple entities by ids", async () => {
      const result = await store.getByIds(["1", "3"]);

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: "1", name: "Entity 1", value: 100 },
        { id: "3", name: "Entity 3", value: 300 },
      ]);
    });

    it("should filter out non-existent ids", async () => {
      const result = await store.getByIds(["1", "non-existent", "3"]);

      expect(result).toHaveLength(2);
      expect(result.map(e => e.id)).toEqual(["1", "3"]);
    });

    it("should return empty array when no ids match", async () => {
      const result = await store.getByIds(["invalid1", "invalid2"]);

      expect(result).toEqual([]);
    });

    it("should return empty array when given empty ids array", async () => {
      const result = await store.getByIds([]);

      expect(result).toEqual([]);
    });

  });

  describe("create", () => {

    it("should add new entity to store", async () => {
      const newEntity: TestEntity = { id: "4", name: "Entity 4", value: 400 };

      const id = await store.create(newEntity);

      expect(id).toBe("4");
      const allEntities = await store.getAll();
      expect(allEntities).toHaveLength(4);
      expect(allEntities[3]).toEqual(newEntity);
    });

    it("should store cloned entity (not reference)", async () => {
      const newEntity: TestEntity = { id: "4", name: "Entity 4", value: 400 };

      await store.create(newEntity);
      newEntity.name = "Modified";

      const result = await store.get("4");
      expect(result?.name).toBe("Entity 4");
    });

    it("should throw error when creating duplicate id", async () => {
      const duplicateEntity: TestEntity = { id: "1", name: "Duplicate", value: 999 };

      try {
        await store.create(duplicateEntity);
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toBe("DUPLICATE_ENTITY");
      }

      const allEntities = await store.getAll();
      expect(allEntities).toHaveLength(3);
    });

  });

  describe("update", () => {

    it("should update existing entity", async () => {
      const updatedEntity: TestEntity = { id: "2", name: "Updated Entity 2", value: 250 };

      await store.update(updatedEntity);

      const result = await store.get("2");
      expect(result).toEqual(updatedEntity);
    });

    it("should store cloned entity (not reference)", async () => {
      const updatedEntity: TestEntity = { id: "2", name: "Updated", value: 250 };

      await store.update(updatedEntity);
      updatedEntity.name = "Modified After Update";

      const result = await store.get("2");
      expect(result?.name).toBe("Updated");
    });

    it("should throw error when updating non-existent entity", async () => {
      const nonExistentEntity: TestEntity = { id: "999", name: "Does not exist", value: 0 };

      try {
        await store.update(nonExistentEntity);
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toBe("NON_EXISTENT_ENTITY");
      }
    });

  });

  describe("delete", () => {

    it("should delete entity by id", async () => {
      await store.delete("2");

      const result = await store.get("2");
      expect(result).toBeNull();

      const allEntities = await store.getAll();
      expect(allEntities).toHaveLength(2);
      expect(allEntities.map(e => e.id)).toEqual(["1", "3"]);
    });

    it("should not throw error when deleting non-existent entity", async () => {
      await expect(store.delete("non-existent")).resolves.not.toThrow();

      const allEntities = await store.getAll();
      expect(allEntities).toHaveLength(3);
    });

    it("should handle deleting from empty store", async () => {
      const emptyStore = new MemoryStore<TestEntity>([]);

      await expect(emptyStore.delete("1")).resolves.not.toThrow();
    });

  });

  describe("edge cases", () => {

    it("should handle entity with nested objects", async () => {
      interface ComplexEntity extends Entity {
        id: string;
        nested: { deep: { value: string } };
      }

      const complexStore = new MemoryStore<ComplexEntity>([
        { id: "1", nested: { deep: { value: "original" } } }
      ]);

      const result = await complexStore.get("1");
      if (result) {
        result.nested.deep.value = "modified";
      }

      const secondResult = await complexStore.get("1");
      expect(secondResult?.nested.deep.value).toBe("original");
    });

    it("should handle concurrent operations", async () => {
      const promises = [
        store.create({ id: "4", name: "Entity 4", value: 400 }),
        store.create({ id: "5", name: "Entity 5", value: 500 }),
        store.get("1"),
        store.delete("2"),
      ];

      await Promise.all(promises);

      const allEntities = await store.getAll();
      expect(allEntities).toHaveLength(4);
    });

  });

});