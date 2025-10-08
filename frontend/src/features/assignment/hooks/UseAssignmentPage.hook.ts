import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchAssignmentById } from '../store/Assignment.thunks';
import { selectAssignmentById, selectAssignmentsLoading, selectAssignmentsError } from '../store/Assignment.selectors';

export const useAssignmentPageData = (assignmentId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (assignmentId) {
            dispatch(fetchAssignmentById(assignmentId));
        }
    }, [dispatch, assignmentId]);

    const assignment = useAppSelector((state) => selectAssignmentById(state, assignmentId));
    const loading = useAppSelector((state) => selectAssignmentsLoading(state));
    const error = useAppSelector((state) => selectAssignmentsError(state));

    return {
        assignment,
        fetching: loading,
        error,
    };
};
