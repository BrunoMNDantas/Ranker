import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchOptionById } from '../store/Option.thunks';
import { fetchAssignmentsOfOption } from '../../assignment/store/Assignment.thunks';
import { fetchRankById } from '../../rank/store/Rank.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { optionSelectors } from '../store/Option.slice';
import { assignmentSelectors } from '../../assignment/store/Assignment.slice';
import { rankSelectors } from '../../rank/store/Rank.slice';
import { userSelectors } from '../../user/store/User.slice';

export const useOptionPageData = (optionId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (optionId) {
            dispatch(fetchOptionById(optionId));
            dispatch(fetchAssignmentsOfOption(optionId));
        }
    }, [dispatch, optionId]);

    const option = useAppSelector((state) => optionSelectors.selectById(state, optionId));
    const assignments = useAppSelector((state) => assignmentSelectors.selectAll(state));

    useEffect(() => {
        if (option) {
            dispatch(fetchRankById(option.rankId));
        }
    }, [dispatch, option]);

    const rank = useAppSelector((state) =>
        option ? rankSelectors.selectById(state, option.rankId) : null
    );

    useEffect(() => {
        if (option) {
            dispatch(fetchUserById(option.ownerId));
        }
    }, [dispatch, option]);

    const user = useAppSelector((state) =>
        option ? userSelectors.selectById(state, option.ownerId) : null
    );

    const loading = useAppSelector((state) =>
        state.option.loading ||
        state.assignment.loading ||
        state.rank.loading ||
        state.user.loading
    );

    const error = useAppSelector((state) =>
        state.option.error ||
        state.assignment.error ||
        state.rank.error ||
        state.user.error
    );

    return {
        option,
        assignments,
        rank,
        user,
        fetching: loading,
        error,
    };
};
