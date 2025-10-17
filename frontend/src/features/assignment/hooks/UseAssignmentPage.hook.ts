import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchAssignmentById } from '../store/Assignment.thunks';
import { selectAssignmentsLoading, selectAssignmentsError } from '../store/Assignment.selectors';
import { RootState } from '../../../app/store';

export const getAssignmentPageData = (state: RootState) => {
    return {
        fetching: selectAssignmentsLoading(state),
        error: selectAssignmentsError(state),
    };
};

export const useAssignmentPageData = (assignmentId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (assignmentId) {
            dispatch(fetchAssignmentById(assignmentId));
        }
    }, [dispatch, assignmentId]);

    return useAppSelector(getAssignmentPageData);
};
