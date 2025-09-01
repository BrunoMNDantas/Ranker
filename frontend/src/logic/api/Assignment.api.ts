import { Assignment } from "../entities/Assignment"
import Store, { MOCKED_DATA } from "./Store"

export const ASSIGNMENT_STORE: Store<Assignment> = new Store()

export const getAllAssignments = (): Promise<Assignment[]> => ASSIGNMENT_STORE.getAll()

export const getAssignment = (id: string): Promise<Assignment|null> => ASSIGNMENT_STORE.get(id)

export const getAssignmentsOfVote = async (voteId: string): Promise<Assignment[]> => {
    const assignments = await ASSIGNMENT_STORE.getAll()
    return assignments.filter(assignment => assignment.voteId === voteId)
}

export const createAssignment = (assignment: Assignment): Promise<void> => ASSIGNMENT_STORE.create(assignment)

export const updateAssignment = (assignment: Assignment): Promise<void> => ASSIGNMENT_STORE.update(assignment)

export const deleteAssignment = (id: string): Promise<void> => ASSIGNMENT_STORE.delete(id)

MOCKED_DATA.forEach(rank => {
    rank.votes.forEach(vote => {
        vote.assignments.forEach(assignment => {
            ASSIGNMENT_STORE.create({
                id: assignment.id,
                creationDate: new Date(),
                voteId: vote.id,
                optionId: assignment.optionId,
                tierId: assignment.tierId
            })
        })
    })
})