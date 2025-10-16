import FirestoreStore, { convertDatesToFirestore, convertDatesFromFirestore } from "./Firestore.store";
import { Entity } from "../Store";

// Mock Firebase modules
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(() => ({})),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),
  browserLocalPersistence: {},
  setPersistence: jest.fn(() => Promise.resolve()),
}));

jest.mock("firebase/firestore", () => {
  // Create the mock Timestamp inside the mock factory
  class Timestamp {
    seconds: number;
    nanoseconds: number;

    constructor(seconds: number, nanoseconds: number) {
      this.seconds = seconds;
      this.nanoseconds = nanoseconds;
    }

    toDate(): Date {
      return new Date(this.seconds * 1000);
    }

    static fromDate = jest.fn((date: Date): Timestamp => {
      return new Timestamp(Math.floor(date.getTime() / 1000), 0);
    });
  }

  return {
    getFirestore: jest.fn(() => ({})),
    collection: jest.fn((db, path) => ({ _path: path })),
    doc: jest.fn((collection, id) => ({ _collection: collection, _id: id })),
    getDoc: jest.fn(),
    getDocs: jest.fn(),
    query: jest.fn((collection) => collection),
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
    Timestamp,
    CollectionReference: class {},
    DocumentData: class {},
  };
});

import { getDoc, getDocs, setDoc, updateDoc, deleteDoc, Timestamp, collection, doc } from "firebase/firestore";

interface TestEntity extends Entity {
  id: string;
  name: string;
  value: number;
  createdAt?: Date;
}

describe("FirestoreStore", () => {

  let store: FirestoreStore<TestEntity>;

  const mockEntities: TestEntity[] = [
    { id: "1", name: "Entity 1", value: 100 },
    { id: "2", name: "Entity 2", value: 200 },
    { id: "3", name: "Entity 3", value: 300 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Re-implement fromDate after clearing mocks
    (Timestamp.fromDate as jest.Mock).mockImplementation((date: Date) => {
      return new Timestamp(Math.floor(date.getTime() / 1000), 0);
    });
    store = new FirestoreStore<TestEntity>("test-collection");
  });

  describe("constructor", () => {

    it("should initialize with collection", () => {
      const testStore = new FirestoreStore<TestEntity>("my-collection");
      expect(testStore).toBeDefined();
      expect(collection).toHaveBeenCalled();
    });

  });

  describe("getAll", () => {

    it("should return all entities from Firestore", async () => {
      const mockDocs = mockEntities.map((entity) => ({
        data: () => entity,
      }));

      (getDocs as jest.Mock).mockResolvedValue({
        docs: mockDocs,
      });

      const result = await store.getAll();

      expect(result).toHaveLength(3);
      expect(result).toEqual(mockEntities);
      expect(getDocs).toHaveBeenCalledTimes(1);
    });

    it("should convert Firestore timestamps to dates", async () => {
      const date = new Date("2024-01-15T10:00:00Z");
      const mockTimestamp = new Timestamp(Math.floor(date.getTime() / 1000), 0);

      const entityWithTimestamp = {
        id: "1",
        name: "Entity 1",
        value: 100,
        createdAt: mockTimestamp,
      };

      const mockDocs = [{ data: () => entityWithTimestamp }];

      (getDocs as jest.Mock).mockResolvedValue({
        docs: mockDocs,
      });

      const result = await store.getAll();

      expect(result).toHaveLength(1);
      expect(result[0].createdAt).toBeInstanceOf(Date);
      expect(result[0].createdAt).toEqual(date);
    });

    it("should return empty array when collection is empty", async () => {
      (getDocs as jest.Mock).mockResolvedValue({
        docs: [],
      });

      const result = await store.getAll();

      expect(result).toEqual([]);
    });

  });

  describe("get", () => {

    it("should return entity by id", async () => {
      const mockEntity = mockEntities[1];

      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => mockEntity,
      });

      const result = await store.get("2");

      expect(result).toEqual(mockEntity);
      expect(getDoc).toHaveBeenCalledTimes(1);
    });

    it("should return null when entity does not exist", async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => false,
        data: () => null,
      });

      const result = await store.get("non-existent");

      expect(result).toBeNull();
    });

    it("should convert Firestore timestamps to dates", async () => {
      const date = new Date("2024-01-15T10:00:00Z");
      const mockTimestamp = new Timestamp(Math.floor(date.getTime() / 1000), 0);

      const entityWithTimestamp = {
        id: "1",
        name: "Entity 1",
        value: 100,
        createdAt: mockTimestamp,
      };

      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => entityWithTimestamp,
      });

      const result = await store.get("1");

      expect(result).not.toBeNull();
      expect(result?.createdAt).toBeInstanceOf(Date);
      expect(result?.createdAt).toEqual(date);
    });

  });

  describe("getByIds", () => {

    it("should return multiple entities by ids", async () => {
      (getDoc as jest.Mock)
        .mockResolvedValueOnce({
          exists: () => true,
          data: () => mockEntities[0],
        })
        .mockResolvedValueOnce({
          exists: () => true,
          data: () => mockEntities[2],
        });

      const result = await store.getByIds(["1", "3"]);

      expect(result).toHaveLength(2);
      expect(result).toEqual([mockEntities[0], mockEntities[2]]);
      expect(getDoc).toHaveBeenCalledTimes(2);
    });

    it("should filter out non-existent entities", async () => {
      (getDoc as jest.Mock)
        .mockResolvedValueOnce({
          exists: () => true,
          data: () => mockEntities[0],
        })
        .mockResolvedValueOnce({
          exists: () => false,
          data: () => null,
        })
        .mockResolvedValueOnce({
          exists: () => true,
          data: () => mockEntities[2],
        });

      const result = await store.getByIds(["1", "non-existent", "3"]);

      expect(result).toHaveLength(2);
      expect(result.map((e) => e.id)).toEqual(["1", "3"]);
    });

    it("should return empty array when no ids match", async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => false,
        data: () => null,
      });

      const result = await store.getByIds(["invalid1", "invalid2"]);

      expect(result).toEqual([]);
    });

    it("should return empty array when given empty ids array", async () => {
      const result = await store.getByIds([]);

      expect(result).toEqual([]);
      expect(getDoc).not.toHaveBeenCalled();
    });

  });

  describe("create", () => {

    it("should create new entity in Firestore", async () => {
      const newEntity: TestEntity = { id: "4", name: "Entity 4", value: 400 };

      (setDoc as jest.Mock).mockResolvedValue(undefined);

      const id = await store.create(newEntity);

      expect(id).toBe("4");
      expect(setDoc).toHaveBeenCalledTimes(1);
      const setDocCall = (setDoc as jest.Mock).mock.calls[0];
      expect(setDocCall[1]).toEqual(expect.objectContaining({ id: "4", name: "Entity 4", value: 400 }));
    });

    it("should convert dates to Firestore timestamps when creating", async () => {
      const date = new Date("2024-01-15T10:00:00Z");
      const entityWithDate: TestEntity = {
        id: "4",
        name: "Entity 4",
        value: 400,
        createdAt: date,
      };

      (setDoc as jest.Mock).mockResolvedValue(undefined);

      await store.create(entityWithDate);

      expect(Timestamp.fromDate).toHaveBeenCalledWith(date);

      const callArgs = (setDoc as jest.Mock).mock.calls[0][1];
      expect(callArgs.id).toBe("4");
      expect(callArgs.createdAt).toBeInstanceOf(Timestamp);
    });

    it("should handle Firestore errors during creation", async () => {
      const newEntity: TestEntity = { id: "4", name: "Entity 4", value: 400 };
      const firestoreError = new Error("Firestore permission denied");

      (setDoc as jest.Mock).mockRejectedValue(firestoreError);

      await expect(store.create(newEntity)).rejects.toThrow("Firestore permission denied");
    });

  });

  describe("update", () => {

    it("should update existing entity in Firestore", async () => {
      const updatedEntity: TestEntity = { id: "2", name: "Updated Entity 2", value: 250 };

      (updateDoc as jest.Mock).mockResolvedValue(undefined);

      await store.update(updatedEntity);

      expect(updateDoc).toHaveBeenCalledTimes(1);

      const updateDocCall = (updateDoc as jest.Mock).mock.calls[0];
      expect(updateDocCall[1]).toEqual(expect.objectContaining({ name: "Updated Entity 2", value: 250 }));
      // Verify that id is excluded from update data
      expect(updateDocCall[1].id).toBeUndefined();
    });

    it("should convert dates to Firestore timestamps when updating", async () => {
      const date = new Date("2024-01-15T10:00:00Z");
      const entityWithDate: TestEntity = {
        id: "2",
        name: "Updated",
        value: 250,
        createdAt: date,
      };

      (updateDoc as jest.Mock).mockResolvedValue(undefined);

      await store.update(entityWithDate);

      expect(Timestamp.fromDate).toHaveBeenCalledWith(date);

      const callArgs = (updateDoc as jest.Mock).mock.calls[0][1];
      expect(callArgs.name).toBe("Updated");
      expect(callArgs.createdAt).toBeInstanceOf(Timestamp);
    });

    it("should handle Firestore errors during update", async () => {
      const updatedEntity: TestEntity = { id: "2", name: "Updated", value: 250 };
      const firestoreError = new Error("Firestore document not found");

      (updateDoc as jest.Mock).mockRejectedValue(firestoreError);

      await expect(store.update(updatedEntity)).rejects.toThrow("Firestore document not found");
    });

  });

  describe("delete", () => {

    it("should delete entity from Firestore", async () => {
      (deleteDoc as jest.Mock).mockResolvedValue(undefined);

      await store.delete("2");

      expect(deleteDoc).toHaveBeenCalledTimes(1);
    });

    it("should handle deleting non-existent entity", async () => {
      (deleteDoc as jest.Mock).mockResolvedValue(undefined);

      await expect(store.delete("non-existent")).resolves.not.toThrow();
    });

    it("should handle Firestore errors during deletion", async () => {
      const firestoreError = new Error("Firestore permission denied");

      (deleteDoc as jest.Mock).mockRejectedValue(firestoreError);

      await expect(store.delete("2")).rejects.toThrow("Firestore permission denied");
    });

  });

});

describe("Date conversion utilities", () => {

  describe("convertDatesToFirestore", () => {

    it("should convert Date objects to Firestore Timestamps", () => {
      const date = new Date("2024-01-15T10:00:00Z");
      const obj = {
        id: "1",
        name: "Test",
        createdAt: date,
        updatedAt: date,
      };

      convertDatesToFirestore(obj);

      expect(Timestamp.fromDate).toHaveBeenCalledWith(date);
    });

    it("should preserve non-Date values", () => {
      const obj = {
        id: "1",
        name: "Test",
        value: 100,
        active: true,
        tags: ["a", "b"],
        metadata: null
      };

      const result = convertDatesToFirestore(obj);

      expect(result).toEqual(obj);
    });

    it("should handle empty objects", () => {
      const result = convertDatesToFirestore({});

      expect(result).toEqual({});
    });

  });

  describe("convertDatesFromFirestore", () => {

    it("should convert Firestore Timestamps to Date objects", () => {
      const date = new Date("2024-01-15T10:00:00Z");
      const mockTimestamp = new Timestamp(Math.floor(date.getTime() / 1000), 0);

      const obj = {
        id: "1",
        name: "Test",
        createdAt: mockTimestamp,
      };

      const result = convertDatesFromFirestore(obj);

      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.createdAt).toEqual(date);
    });

    it("should preserve non-Timestamp values", () => {
      const obj = {
        id: "1",
        name: "Test",
        value: 100,
        active: true,
        tags: ["a", "b"],
        metadata: null
      };

      const result = convertDatesFromFirestore(obj);

      expect(result).toEqual(obj);
    });

    it("should handle empty objects", () => {
      const result = convertDatesFromFirestore({});

      expect(result).toEqual({});
    });

    it("should handle objects with multiple timestamps", () => {
      const createdDate = new Date("2024-01-15T10:00:00Z");
      const updatedDate = new Date("2024-01-16T10:00:00Z");

      const createdTimestamp = new Timestamp(Math.floor(createdDate.getTime() / 1000), 0);
      const updatedTimestamp = new Timestamp(Math.floor(updatedDate.getTime() / 1000), 0);

      const obj = {
        id: "1",
        name: "Test",
        createdAt: createdTimestamp,
        updatedAt: updatedTimestamp,
      };

      const result = convertDatesFromFirestore(obj);

      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.createdAt).toEqual(createdDate);
      expect(result.updatedAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toEqual(updatedDate);
    });

  });

});