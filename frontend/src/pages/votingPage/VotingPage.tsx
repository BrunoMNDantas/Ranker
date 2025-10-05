import React from 'react';
import classes from './VotingPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import LoadElement from '../../components/loadElement/LoadElement';
import { useVotingPageData } from '../../features/rank/hooks/UseVotingPage.hook';
import { Assignment } from '../../features/assignment/model/Assignment.types';
import { createVote } from '../../services/EntityFactory.service';
import VotingCard from '../../features/vote/components/votingCard/VotingCard';
import { appVoteRoute } from '../../app/Routes';
import { createVoteThunk } from '../../features/vote/store/Vote.thunks';
import { createAssignmentThunk } from '../../features/assignment/store/Assignment.thunks';
import { useAppDispatch } from '../../app/hooks';

const RankVotePage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { rankId } = useParams<{ rankId: string }>()

	const { rank, options, tiers, fetching, error } = useVotingPageData(rankId || "")

	const handleVote = async (assignments: Assignment[]) => {
		const vote = createVote({rankId})
		const result = await dispatch(createVoteThunk(vote)).unwrap()

		assignments.forEach(assignment => assignment.voteId = result.id)
		await Promise.all(assignments.map(assignment => dispatch(createAssignmentThunk(assignment)).unwrap()))

		navigate(appVoteRoute(result.id))
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !rank ? "Entity not found!" : null}
				{!fetching && !error && rank ?
					<VotingCard rank={rank} tiers={tiers} options={options} onVote={handleVote}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default RankVotePage;