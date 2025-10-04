import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchTierById } from '../store/Tier.thunks';
import { fetchAssignmentsOfTier } from '../../assignment/store/Assignment.thunks';
import { fetchRankById } from '../../rank/store/Rank.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { tierSelectors } from '../store/Tier.slice';
import { assignmentSelectors } from '../../assignment/store/Assignment.slice';
import { rankSelectors } from '../../rank/store/Rank.slice';
import { userSelectors } from '../../user/store/User.slice';

export const useTierPageData = (tierId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tierId) {
            dispatch(fetchTierById(tierId));
            dispatch(fetchAssignmentsOfTier(tierId));
        }
    }, [dispatch, tierId]);

    const tier = useAppSelector((state) => tierSelectors.selectById(state, tierId));
    const assignments = useAppSelector((state) => assignmentSelectors.selectAll(state));

    useEffect(() => {
        if (tier) {
            dispatch(fetchRankById(tier.rankId));
        }
    }, [dispatch, tier]);

    const rank = useAppSelector((state) =>
        tier ? rankSelectors.selectById(state, tier.rankId) : null
    );

    useEffect(() => {
        if (tier) {
            dispatch(fetchUserById(tier.ownerId));
        }
    }, [dispatch, tier]);

    const user = useAppSelector((state) =>
        tier ? userSelectors.selectById(state, tier.ownerId) : null
    );

    const loading = useAppSelector((state) =>
        state.tier.loading ||
        state.assignment.loading ||
        state.rank.loading ||
        state.user.loading
    );

    const error = useAppSelector((state) =>
        state.tier.error ||
        state.assignment.error ||
        state.rank.error ||
        state.user.error
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
