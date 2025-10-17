import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchTierById } from '../store/Tier.thunks';
import { fetchAssignmentsOfTier } from '../../assignment/store/Assignment.thunks';
import { fetchRankById } from '../../rank/store/Rank.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { selectTierById, selectTiersLoading, selectTiersError } from '../store/Tier.selectors';
import { selectAssignmentsLoading, selectAssignmentsError } from '../../assignment/store/Assignment.selectors';
import { selectRanksLoading, selectRanksError } from '../../rank/store/Rank.selectors';
import { selectUsersLoading, selectUsersError } from '../../user/store/User.selectors';
import { RootState } from '../../../app/store';

export const getTierPageData = (state: RootState) => {
    const loading =
        selectTiersLoading(state) ||
        selectAssignmentsLoading(state) ||
        selectRanksLoading(state) ||
        selectUsersLoading(state);

    const error =
        selectTiersError(state) ||
        selectAssignmentsError(state) ||
        selectRanksError(state) ||
        selectUsersError(state);

    return {
        fetching: loading,
        error,
    };
};

export const useTierPageData = (tierId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tierId) {
            dispatch(fetchTierById(tierId));
            dispatch(fetchAssignmentsOfTier(tierId));
        }
    }, [dispatch, tierId]);

    const tier = useAppSelector((state) => selectTierById(state, tierId));

    useEffect(() => {
        if (tier) {
            dispatch(fetchRankById(tier.rankId));
        }
    }, [dispatch, tier?.rankId]);

    useEffect(() => {
        if (tier) {
            dispatch(fetchUserById(tier.ownerId));
        }
    }, [dispatch, tier?.ownerId]);

    return useAppSelector(getTierPageData);
};
