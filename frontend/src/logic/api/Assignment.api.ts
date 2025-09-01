import { Assignment } from "../entities/Assignment"
import Store, { MOCKED_DATA } from "./Store"

export const ASSIGNEMENT_STORE: Store<Assignment> = new Store()

export const getAllAssignments = (): Promise<Assignment[]> => ASSIGNEMENT_STORE.getAll()

export const getAssignment = (id: string): Promise<Assignment|null> => ASSIGNEMENT_STORE.get(id)

export const getAssignmentsOfVote = async (voteId: string): Promise<Assignment[]> => {
    const assignements = await ASSIGNEMENT_STORE.getAll()
    return assignements.filter(assignement => assignement.voteId === voteId)
}

export const createAssignment = (assignment: Assignment): Promise<void> => ASSIGNEMENT_STORE.create(assignment)

export const updateAssignment = (assignment: Assignment): Promise<void> => ASSIGNEMENT_STORE.update(assignment)

export const deleteAssignment = (id: string): Promise<void> => ASSIGNEMENT_STORE.delete(id)

MOCKED_DATA.forEach(rank => {
    rank.votes.forEach(vote => {
        vote.assignements.forEach(assignement => {
            ASSIGNEMENT_STORE.create({
                id: assignement.id,
                creationDate: new Date(),
                voteId: vote.id,
                optionId: assignement.optionId,
                tierId: assignement.tierId
            })
        })
    })
})