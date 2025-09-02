import { Assignment } from "../entities/Assignment"
import { ASSIGNEMENTS } from "./Data"
import { delay, Delayed } from "./DelayedStore"
import Store from "./Store"

export const ASSIGNMENT_STORE: Delayed<Store<Assignment>> = delay(new Store(ASSIGNEMENTS))


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
    return await ASSIGNMENT_STORE.create(assignment)
}

export const updateAssignment = (assignment: Assignment): Promise<void> => ASSIGNMENT_STORE.update(assignment)

export const deleteAssignment = (id: string): Promise<void> => ASSIGNMENT_STORE.delete(id)

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