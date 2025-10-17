import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchVoteById } from '../store/Vote.thunks';
import { fetchAssignmentsOfVote } from '../../assignment/store/Assignment.thunks';
import { fetchRankById } from '../../rank/store/Rank.thunks';
import { fetchUserById } from '../../user/store/User.thunks';
import { selectVoteById, selectVotesLoading, selectVotesError } from '../store/Vote.selectors';
import { selectAssignmentsLoading, selectAssignmentsError } from '../../assignment/store/Assignment.selectors';
import { selectRanksLoading, selectRanksError } from '../../rank/store/Rank.selectors';
import { selectUsersLoading, selectUsersError } from '../../user/store/User.selectors';
import { RootState } from '../../../app/store';

export const getVotePageData = (state: RootState) => {
    const loading =
        selectVotesLoading(state) ||
        selectAssignmentsLoading(state) ||
        selectRanksLoading(state) ||
        selectUsersLoading(state);

    const error =
        selectVotesError(state) ||
        selectAssignmentsError(state) ||
        selectRanksError(state) ||
        selectUsersError(state);

    return {
        fetching: loading,
        error,
    };
};

export const useVotePageData = (voteId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (voteId) {
            dispatch(fetchVoteById(voteId));
            dispatch(fetchAssignmentsOfVote(voteId));
        }
    }, [dispatch, voteId]);

    const vote = useAppSelector((state) => selectVoteById(state, voteId));

    useEffect(() => {
        if (vote) {
            dispatch(fetchRankById(vote.rankId));
        }
    }, [dispatch, vote?.rankId]);

    useEffect(() => {
        if (vote) {
            dispatch(fetchUserById(vote.ownerId));
        }
    }, [dispatch, vote?.ownerId]);

    return useAppSelector(getVotePageData);
};
