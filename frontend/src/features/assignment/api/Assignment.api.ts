import { Assignment } from "../model/Assignment.types"
import DelayedStore from "../../../services/store/Delayed.store"
import Store from "../../../services/store/Store"
import FirestoreStore from "../../../services/store/Firestore.store"
import { API_RESPONSE_TIME } from "../../../app/Constants"

export const ASSIGNMENT_STORE: Store<Assignment> = new DelayedStore<Assignment>(new FirestoreStore<Assignment>("assignments"), API_RESPONSE_TIME)


export const getAllAssignments = (): Promise<Assignment[]> => ASSIGNMENT_STORE.getAll()

export const getAssignment = (id: string): Promise<Assignment|null> => ASSIGNMENT_STORE.get(id)

export const getAssignmentsOfVote = async (voteId: string): Promise<Assignment[]> => {
    const assignments = await ASSIGNMENT_STORE.getAll()
    return assignments.filter(assignment => assignment.voteId === voteId)
}

export const getAssignmentsOfTier = async (tierId: string): Promise<Assignment[]> => {
    const assignments = await ASSIGNMENT_STORE.getAll()
    return assignments.filter(assignment => assignment.tierId === tierId)
}

export const getAssignmentsOfOption = async (optionId: string): Promise<Assignment[]> => {
    const assignments = await ASSIGNMENT_STORE.getAll()
    return assignments.filter(assignment => assignment.optionId === optionId)
}

export const createAssignment = async (assignment: Assignment): Promise<string> => {
    assignment.creationDate = new Date()
    assignment.lastUpdateDate = new Date()
    return await ASSIGNMENT_STORE.create(assignment)
}

export const updateAssignment = (assignment: Assignment): Promise<void> => {
    assignment.lastUpdateDate = new Date()
    return ASSIGNMENT_STORE.update(assignment)
}

export const deleteAssignment = async (id: string): Promise<void> => {
    const assignment = await ASSIGNMENT_STORE.get(id)
    const assignmentsOfVote = await getAssignmentsOfVote(assignment?.voteId || "")
    const updateOrderPromises = assignmentsOfVote
        .filter(assignment => assignment.id !== id)
        .sort((assignmentA, assignmentB) => assignmentA.order - assignmentB.order)
        .map((assignment, index) => { return { ...assignment, order: index + 1 } })
        .map(updateAssignment)
    await Promise.all(updateOrderPromises)

    await ASSIGNMENT_STORE.delete(id)
}

export const deleteAssignmentsOfVote = async (voteId: string): Promise<void> => {
    const assignments = await getAssignmentsOfVote(voteId)
    await Promise.all(assignments.map(assignment => assignment.id ? deleteAssignment(assignment.id) : Promise.resolve()))
}

export const deleteAssignmentsOfTier = async (tierId: string): Promise<void> => {
    const assignments = await getAssignmentsOfTier(tierId)
    await Promise.all(assignments.map(assignment => assignment.id ? deleteAssignment(assignment.id) : Promise.resolve()))
}

export const deleteAssignmentsOfOption = async (optionId: string): Promise<void> => {
    const assignments = await getAssignmentsOfOption(optionId)
    await Promise.all(assignments.map(assignment => assignment.id ? deleteAssignment(assignment.id) : Promise.resolve()))
}