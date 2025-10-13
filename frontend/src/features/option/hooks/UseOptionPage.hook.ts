import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchOptionById } from '../store/Option.thunks';
import { fetchAssignmentsOfOption } from '../../assignment/store/Assignment.thunks';
import { fetchRankById } from '../../rank/store/Rank.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { selectOptionById, selectOptionsLoading, selectOptionsError } from '../store/Option.selectors';
import { selectAssignmentsOfOption, selectAssignmentsLoading, selectAssignmentsError } from '../../assignment/store/Assignment.selectors';
import { selectRankById, selectRanksLoading, selectRanksError } from '../../rank/store/Rank.selectors';
import { selectUserById, selectUsersLoading, selectUsersError } from '../../user/store/User.selectors';

export const useOptionPageData = (optionId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (optionId) {
            dispatch(fetchOptionById(optionId));
            dispatch(fetchAssignmentsOfOption(optionId));
        }
    }, [dispatch, optionId]);

    const option = useAppSelector((state) => selectOptionById(state, optionId));
    const assignments = useAppSelector((state) => selectAssignmentsOfOption(state, optionId));

    useEffect(() => {
        if (option) {
            dispatch(fetchRankById(option.rankId));
        }
    }, [dispatch, option?.rankId]);

    const rank = useAppSelector((state) =>
        option ? selectRankById(state, option.rankId) : null
    );

    useEffect(() => {
        if (option) {
            dispatch(fetchUserById(option.ownerId));
        }
    }, [dispatch, option?.ownerId]);

    const user = useAppSelector((state) =>
        option ? selectUserById(state, option.ownerId) : null
    );

    const loading = useAppSelector((state) =>
        selectOptionsLoading(state) ||
        selectAssignmentsLoading(state) ||
        selectRanksLoading(state) ||
        selectUsersLoading(state)
    );

    const error = useAppSelector((state) =>
        selectOptionsError(state) ||
        selectAssignmentsError(state) ||
        selectRanksError(state) ||
        selectUsersError(state)
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
