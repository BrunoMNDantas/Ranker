import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchOptionById } from '../store/Option.thunks';
import { fetchAssignmentsOfOption } from '../../assignment/store/Assignment.thunks';
import { fetchRankById } from '../../rank/store/Rank.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { selectOptionById, selectOptionsLoading, selectOptionsError } from '../store/Option.selectors';
import { selectAssignmentsLoading, selectAssignmentsError } from '../../assignment/store/Assignment.selectors';
import { selectRanksLoading, selectRanksError } from '../../rank/store/Rank.selectors';
import { selectUsersLoading, selectUsersError } from '../../user/store/User.selectors';
import { RootState } from '../../../app/store';

export const getOptionPageData = (state: RootState) => {
    const loading =
        selectOptionsLoading(state) ||
        selectAssignmentsLoading(state) ||
        selectRanksLoading(state) ||
        selectUsersLoading(state);

    const error =
        selectOptionsError(state) ||
        selectAssignmentsError(state) ||
        selectRanksError(state) ||
        selectUsersError(state);

    return {
        fetching: loading,
        error,
    };
};

export const useOptionPageData = (optionId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (optionId) {
            dispatch(fetchOptionById(optionId));
            dispatch(fetchAssignmentsOfOption(optionId));
        }
    }, [dispatch, optionId]);

    const option = useAppSelector((state) => selectOptionById(state, optionId));

    useEffect(() => {
        if (option) {
            dispatch(fetchRankById(option.rankId));
        }
    }, [dispatch, option?.rankId]);

    useEffect(() => {
        if (option) {
            dispatch(fetchUserById(option.ownerId));
        }
    }, [dispatch, option?.ownerId]);

    return useAppSelector(getOptionPageData);
};
