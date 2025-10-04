import { createAsyncThunk } from '@reduxjs/toolkit';
import { Assignment } from '../model/Assignment.types';
import {
    getAllAssignments,
    getAssignment,
    getAssignmentsByIds,
    getAssignmentsOfVote,
    getAssignmentsOfTier,
    getAssignmentsOfOption,
    getAssignmentsOfUser,
    createAssignment,
    updateAssignment,
    deleteAssignment
} from '../api/Assignment.api';

export const fetchAllAssignments = createAsyncThunk(
    'assignment/fetchAll',
    async () => {
        return await getAllAssignments();
    }
);

export const fetchAssignmentById = createAsyncThunk(
    'assignment/fetchById',
    async (id: string) => {
        return await getAssignment(id);
    }
);

export const fetchAssignmentsByIds = createAsyncThunk(
    'assignment/fetchByIds',
    async (ids: string[]) => {
        return await getAssignmentsByIds(ids);
    }
);

export const fetchAssignmentsOfVote = createAsyncThunk(
    'assignment/fetchOfVote',
    async (voteId: string) => {
        return await getAssignmentsOfVote(voteId);
    }
);

export const fetchAssignmentsOfTier = createAsyncThunk(
    'assignment/fetchOfTier',
    async (tierId: string) => {
        return await getAssignmentsOfTier(tierId);
    }
);

export const fetchAssignmentsOfOption = createAsyncThunk(
    'assignment/fetchOfOption',
    async (optionId: string) => {
        return await getAssignmentsOfOption(optionId);
    }
);

export const fetchAssignmentsOfUser = createAsyncThunk(
    'assignment/fetchOfUser',
    async (ownerId: string) => {
        return await getAssignmentsOfUser(ownerId);
    }
);

export const createAssignmentThunk = createAsyncThunk(
    'assignment/create',
    async (assignment: Assignment) => {
        const id = await createAssignment(assignment);
        return { ...assignment, id };
    }
);

export const updateAssignmentThunk = createAsyncThunk(
    'assignment/update',
    async (assignment: Assignment) => {
        await updateAssignment(assignment);
        return assignment;
    }
);

export const deleteAssignmentThunk = createAsyncThunk(
    'assignment/delete',
    async (id: string) => {
        await deleteAssignment(id);
        return id;
    }
);
