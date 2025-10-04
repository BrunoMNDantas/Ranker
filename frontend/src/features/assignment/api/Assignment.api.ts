import { Assignment } from "../model/Assignment.types"
import DelayedStore from "../../../services/store/Delayed.store"
import Store from "../../../services/store/Store"
import FirestoreStore, { AUTH } from "../../../services/store/Firestore.store"
import { API_RESPONSE_TIME } from "../../../app/Constants"
import EntityStore from "../../../services/store/Entity.store"
import AuthStore from "../../../services/store/Auth.store"

export const ASSIGNMENT_STORE: Store<Assignment> = new DelayedStore(
    new AuthStore(
        new EntityStore(new FirestoreStore("assignments")),
        () => AUTH.currentUser?.uid || ""
    ),
    API_RESPONSE_TIME
)


export const getAllAssignments = (): Promise<Assignment[]> => ASSIGNMENT_STORE.getAll()

export const getAssignment = (id: string): Promise<Assignment|null> => ASSIGNMENT_STORE.get(id)

export const getAssignmentsByIds = (ids: string[]): Promise<Assignment[]> => ASSIGNMENT_STORE.getByIds(ids)

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

export const getAssignmentsOfUser = async (ownerId: string): Promise<Assignment[]> => {
    const assignments = await ASSIGNMENT_STORE.getAll()
    return assignments.filter(assignment => assignment.ownerId === ownerId)
}

export const createAssignment = (assignment: Assignment): Promise<string> => ASSIGNMENT_STORE.create(assignment)

export const updateAssignment = (assignment: Assignment): Promise<void> => ASSIGNMENT_STORE.update(assignment)

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
    await Promise.all(assignments.map(assignment => assignment.id).map(deleteAssignment))
}

export const deleteAssignmentsOfTier = async (tierId: string): Promise<void> => {
    const assignments = await getAssignmentsOfTier(tierId)
    await Promise.all(assignments.map(assignment => assignment.id).map(deleteAssignment))
}

export const deleteAssignmentsOfOption = async (optionId: string): Promise<void> => {
    const assignments = await getAssignmentsOfOption(optionId)
    await Promise.all(assignments.map(assignment => assignment.id).map(deleteAssignment))
}

export const deleteAssignmentsOfUser = async (ownerId: string): Promise<void> => {
    const assignments = await getAssignmentsOfUser(ownerId)
    await Promise.all(assignments.map(assignment => assignment.id).map(deleteAssignment))
}