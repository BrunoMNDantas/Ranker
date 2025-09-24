import React from 'react';
import classes from './VotingPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import LoadElement from '../../components/loadElement/LoadElement';
import { useRank } from '../../features/rank/hooks/UseRank.hook';
import { useOptionsOfRank } from '../../features/option/hooks/UseOptionsOfRank.hook';
import { useTiersOfRank } from '../../features/tier/hooks/UseTiersOfRank.hook';
import { Assignment } from '../../features/assignment/model/Assignment.types';
import { createVote } from '../../services/EntityFactory.service';
import { createVote as submitVote } from '../../features/vote/api/Vote.api';
import { createAssignment as submitAssignment } from '../../features/assignment/api/Assignment.api';
import VotingCard from '../../features/vote/components/votingCard/VotingCard';
import { appVoteRoute } from '../../app/Routes';

const RankVotePage = () => {
	const navigate = useNavigate()
	const { rankId } = useParams<{ rankId: string }>()

	const { rank, fetching: fetchingRank, error: rankError } = useRank(rankId || "")
	const { options, fetching: fetchingOptions, error: optionsError } = useOptionsOfRank(rankId || "")
	const { tiers, fetching: fetchingTiers, error: tiersError } = useTiersOfRank(rankId || "")

	const fetching = fetchingRank || fetchingOptions || fetchingTiers
	const error = rankError || optionsError || tiersError

	const handleVote = async (assignments: Assignment[]) => {
		const vote = createVote({rankId})
		const voteId = await submitVote(vote)

		assignments.forEach(assignment => assignment.voteId = voteId)
		await Promise.all(assignments.map(submitAssignment))

		navigate(appVoteRoute(voteId))
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !rank ? "Entity not found!" : null}
				{!fetching && !error && rank ?
					<VotingCard rank={rank} tiers={tiers || []} options={options || []} onVote={handleVote}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default RankVotePage;