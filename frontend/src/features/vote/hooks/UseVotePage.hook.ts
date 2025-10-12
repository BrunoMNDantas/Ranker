import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchVoteById } from '../store/Vote.thunks';
import { fetchAssignmentsOfVote } from '../../assignment/store/Assignment.thunks';
import { fetchRankById } from '../../rank/store/Rank.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { selectVoteById, selectVotesLoading, selectVotesError } from '../store/Vote.selectors';
import { selectAssignmentsOfVote, selectAssignmentsLoading, selectAssignmentsError } from '../../assignment/store/Assignment.selectors';
import { selectRankById, selectRanksLoading, selectRanksError } from '../../rank/store/Rank.selectors';
import { selectUserById, selectUsersLoading, selectUsersError } from '../../user/store/User.selectors';

export const useVotePageData = (voteId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (voteId) {
            dispatch(fetchVoteById(voteId));
            dispatch(fetchAssignmentsOfVote(voteId));
        }
    }, [dispatch, voteId]);

    const vote = useAppSelector((state) => selectVoteById(state, voteId));
    const assignments = useAppSelector((state) => selectAssignmentsOfVote(state, voteId));

    useEffect(() => {
        if (vote) {
            dispatch(fetchRankById(vote.rankId));
        }
    }, [dispatch, vote]);

    const rank = useAppSelector((state) =>
        vote ? selectRankById(state, vote.rankId) : null
    );

    useEffect(() => {
        if (vote) {
            dispatch(fetchUserById(vote.ownerId));
        }
    }, [dispatch, vote]);

    const user = useAppSelector((state) =>
        vote ? selectUserById(state, vote.ownerId) : null
    );

    const loading = useAppSelector((state) =>
        selectVotesLoading(state) ||
        selectAssignmentsLoading(state) ||
        selectRanksLoading(state) ||
        selectUsersLoading(state)
    );

    const error = useAppSelector((state) =>
        selectVotesError(state) ||
        selectAssignmentsError(state) ||
        selectRanksError(state) ||
        selectUsersError(state)
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
