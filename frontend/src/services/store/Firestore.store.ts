import { initializeApp } from 'firebase/app';
import { CollectionReference, DocumentData, getFirestore } from 'firebase/firestore';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import Store, { Entity } from './Store';
import { Timestamp } from "firebase/firestore";

const FIREBASE_CONFIG = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

const APP = initializeApp(FIREBASE_CONFIG)
const DB  = getFirestore(APP)


export const convertDatesToFirestore = (obj: Record<string, any>): Record<string, any> => {
    const result: Record<string, any> = {}

    for (const [key, value] of Object.entries(obj)) {
        if (value instanceof Date) {
            result[key] = Timestamp.fromDate(value)
        } else {
            result[key] = value
        }
    }

    return result
}

export const convertDatesFromFirestore = (obj: Record<string, any>): Record<string, any> => {
    const result: Record<string, any> = {}

    for (const [key, value] of Object.entries(obj)) {
        if (value instanceof Timestamp) {
            result[key] = value.toDate()
        } else {
            result[key] = value
        }
    }

    return result
}

export default class FirestoreStore<T extends Entity> implements Store<T> {

    entities: CollectionReference<DocumentData, DocumentData>


    constructor(path: string) {
        this.entities = collection(DB, path)
    }


    async getAll(): Promise<T[]> {
        const qy = query(this.entities)
        const snap = await getDocs(qy)
        return snap.docs
            .map(s => s.data())
            .map(convertDatesFromFirestore)
            .map(entity => entity as T)
    }

    async get(id: string): Promise<T|null> {
        const ref = doc(this.entities, id)
        const snap = await getDoc(ref)
        return snap.exists() ? convertDatesFromFirestore(snap.data()) as T : null
    }

    async create(entity: T): Promise<string> {
        convertDatesToFirestore(entity)

        const id = crypto.randomUUID()
        const ref = doc(this.entities, id)

        entity.id = id

        await setDoc(ref, {...entity})

        return id
    }

    async update(entity: T): Promise<void> {
        convertDatesToFirestore(entity)

        const ref = doc(this.entities, entity.id)
        const { id, ...updateData } = entity
        await updateDoc(ref, updateData)
    }

    async delete(id: string): Promise<void> {
        const ref = doc(this.entities, id)
        await deleteDoc(ref)
    }

}