import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchAssignmentById } from '../store/Assignment.thunks';
import { assignmentSelectors } from '../store/Assignment.slice';

export const useAssignmentPageData = (assignmentId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (assignmentId) {
            dispatch(fetchAssignmentById(assignmentId));
        }
    }, [dispatch, assignmentId]);

    const assignment = useAppSelector((state) => assignmentSelectors.selectById(state, assignmentId));
    const loading = useAppSelector((state) => state.assignment.loading);
    const error = useAppSelector((state) => state.assignment.error);

    return {
        assignment,
        fetching: loading,
        error,
    };
};
