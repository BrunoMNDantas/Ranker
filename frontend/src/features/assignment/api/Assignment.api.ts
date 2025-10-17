import { Assignment } from "../model/Assignment.types"
import Store from "../../../services/store/Store"
import { ASSIGNMENT_STORE } from "../../../services/store/Stores"

export class AssignmentApi {
    constructor(private store: Store<Assignment>) {}

    getAllAssignments(): Promise<Assignment[]> {
        return this.store.getAll()
    }

    getAssignment(id: string): Promise<Assignment|null> {
        return this.store.get(id)
    }

    getAssignmentsByIds(ids: string[]): Promise<Assignment[]> {
        return this.store.getByIds(ids)
    }

    async getAssignmentsOfVote(voteId: string): Promise<Assignment[]> {
        const assignments = await this.store.getAll()
        return assignments.filter(assignment => assignment.voteId === voteId)
    }

    async getAssignmentsOfTier(tierId: string): Promise<Assignment[]> {
        const assignments = await this.store.getAll()
        return assignments.filter(assignment => assignment.tierId === tierId)
    }

    async getAssignmentsOfOption(optionId: string): Promise<Assignment[]> {
        const assignments = await this.store.getAll()
        return assignments.filter(assignment => assignment.optionId === optionId)
    }

    async getAssignmentsOfUser(ownerId: string): Promise<Assignment[]> {
        const assignments = await this.store.getAll()
        return assignments.filter(assignment => assignment.ownerId === ownerId)
    }

    createAssignment(assignment: Assignment): Promise<string> {
        return this.store.create(assignment)
    }

    updateAssignment(assignment: Assignment): Promise<void> {
        return this.store.update(assignment)
    }

    async deleteAssignment(id: string): Promise<void> {
        const assignment = await this.store.get(id)
        const assignmentsOfVote = await this.getAssignmentsOfVote(assignment?.voteId || "")
        const updateOrderPromises = assignmentsOfVote
            .filter(assignment => assignment.id !== id)
            .sort((assignmentA, assignmentB) => assignmentA.order - assignmentB.order)
            .map((assignment, index) => { return { ...assignment, order: index + 1 } })
            .map(this.updateAssignment.bind(this))
        await Promise.all(updateOrderPromises)

        await this.store.delete(id)
    }

    async deleteAssignmentsOfVote(voteId: string): Promise<void> {
        const assignments = await this.getAssignmentsOfVote(voteId)
        await Promise.all(assignments.map(assignment => assignment.id).map(this.deleteAssignment.bind(this)))
    }

    async deleteAssignmentsOfTier(tierId: string): Promise<void> {
        const assignments = await this.getAssignmentsOfTier(tierId)
        await Promise.all(assignments.map(assignment => assignment.id).map(this.deleteAssignment.bind(this)))
    }

    async deleteAssignmentsOfOption(optionId: string): Promise<void> {
        const assignments = await this.getAssignmentsOfOption(optionId)
        await Promise.all(assignments.map(assignment => assignment.id).map(this.deleteAssignment.bind(this)))
    }

    async deleteAssignmentsOfUser(ownerId: string): Promise<void> {
        const assignments = await this.getAssignmentsOfUser(ownerId)
        await Promise.all(assignments.map(assignment => assignment.id).map(this.deleteAssignment.bind(this)))
    }
}

export const assignmentApi = new AssignmentApi(ASSIGNMENT_STORE)

export const getAllAssignments = assignmentApi.getAllAssignments.bind(assignmentApi)
export const getAssignment = assignmentApi.getAssignment.bind(assignmentApi)
export const getAssignmentsByIds = assignmentApi.getAssignmentsByIds.bind(assignmentApi)
export const getAssignmentsOfVote = assignmentApi.getAssignmentsOfVote.bind(assignmentApi)
export const getAssignmentsOfTier = assignmentApi.getAssignmentsOfTier.bind(assignmentApi)
export const getAssignmentsOfOption = assignmentApi.getAssignmentsOfOption.bind(assignmentApi)
export const getAssignmentsOfUser = assignmentApi.getAssignmentsOfUser.bind(assignmentApi)
export const createAssignment = assignmentApi.createAssignment.bind(assignmentApi)
export const updateAssignment = assignmentApi.updateAssignment.bind(assignmentApi)
export const deleteAssignment = assignmentApi.deleteAssignment.bind(assignmentApi)
export const deleteAssignmentsOfVote = assignmentApi.deleteAssignmentsOfVote.bind(assignmentApi)
export const deleteAssignmentsOfTier = assignmentApi.deleteAssignmentsOfTier.bind(assignmentApi)
export const deleteAssignmentsOfOption = assignmentApi.deleteAssignmentsOfOption.bind(assignmentApi)
export const deleteAssignmentsOfUser = assignmentApi.deleteAssignmentsOfUser.bind(assignmentApi)