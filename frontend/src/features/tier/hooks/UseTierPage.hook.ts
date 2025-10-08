import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchTierById } from '../store/Tier.thunks';
import { fetchAssignmentsOfTier } from '../../assignment/store/Assignment.thunks';
import { fetchRankById } from '../../rank/store/Rank.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { selectTierById, selectTiersLoading, selectTiersError } from '../store/Tier.selectors';
import { selectAllAssignments, selectAssignmentsLoading, selectAssignmentsError } from '../../assignment/store/Assignment.selectors';
import { selectRankById, selectRanksLoading, selectRanksError } from '../../rank/store/Rank.selectors';
import { selectUserById, selectUsersLoading, selectUsersError } from '../../user/store/User.selectors';

export const useTierPageData = (tierId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tierId) {
            dispatch(fetchTierById(tierId));
            dispatch(fetchAssignmentsOfTier(tierId));
        }
    }, [dispatch, tierId]);

    const tier = useAppSelector((state) => selectTierById(state, tierId));
    const assignments = useAppSelector((state) => selectAllAssignments(state));

    useEffect(() => {
        if (tier) {
            dispatch(fetchRankById(tier.rankId));
        }
    }, [dispatch, tier]);

    const rank = useAppSelector((state) =>
        tier ? selectRankById(state, tier.rankId) : null
    );

    useEffect(() => {
        if (tier) {
            dispatch(fetchUserById(tier.ownerId));
        }
    }, [dispatch, tier]);

    const user = useAppSelector((state) =>
        tier ? selectUserById(state, tier.ownerId) : null
    );

    const loading = useAppSelector((state) =>
        selectTiersLoading(state) ||
        selectAssignmentsLoading(state) ||
        selectRanksLoading(state) ||
        selectUsersLoading(state)
    );

    const error = useAppSelector((state) =>
        selectTiersError(state) ||
        selectAssignmentsError(state) ||
        selectRanksError(state) ||
        selectUsersError(state)
    );

    return {
        tier,
        assignments,
        rank,
        user,
        fetching: loading,
        error,
    };
};
