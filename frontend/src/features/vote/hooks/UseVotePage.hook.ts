import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchVoteById } from '../store/Vote.thunks';
import { fetchAssignmentsOfVote } from '../../assignment/store/Assignment.thunks';
import { fetchRankById } from '../../rank/store/Rank.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { voteSelectors } from '../store/Vote.slice';
import { assignmentSelectors } from '../../assignment/store/Assignment.slice';
import { rankSelectors } from '../../rank/store/Rank.slice';
import { userSelectors } from '../../user/store/User.slice';

export const useVotePageData = (voteId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (voteId) {
            dispatch(fetchVoteById(voteId));
            dispatch(fetchAssignmentsOfVote(voteId));
        }
    }, [dispatch, voteId]);

    const vote = useAppSelector((state) => voteSelectors.selectById(state, voteId));
    const assignments = useAppSelector((state) => assignmentSelectors.selectAll(state));

    useEffect(() => {
        if (vote) {
            dispatch(fetchRankById(vote.rankId));
        }
    }, [dispatch, vote]);

    const rank = useAppSelector((state) =>
        vote ? rankSelectors.selectById(state, vote.rankId) : null
    );

    useEffect(() => {
        if (vote) {
            dispatch(fetchUserById(vote.ownerId));
        }
    }, [dispatch, vote]);

    const user = useAppSelector((state) =>
        vote ? userSelectors.selectById(state, vote.ownerId) : null
    );

    const loading = useAppSelector((state) =>
        state.vote.loading ||
        state.assignment.loading ||
        state.rank.loading ||
        state.user.loading
    );

    const error = useAppSelector((state) =>
        state.vote.error ||
        state.assignment.error ||
        state.rank.error ||
        state.user.error
    );

    return {
        vote,
        assignments,
        rank,
        user,
        fetching: loading,
        error,
    };
};
