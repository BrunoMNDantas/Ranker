import React from 'react';
import classes from './RankVotePage.module.css';
import { useParams } from 'react-router-dom';
import LoadElement from '../../components/loadElement/LoadElement';
import { useRank } from '../../features/rank/hooks/UseRank.hook';
import { useOptionsOfRank } from '../../features/option/hooks/UseOptionsOfRank.hook';
import { useTiersOfRank } from '../../features/tier/hooks/UseTiersOfRank.hook';

const RankVotePage = () => {
	const { rankId } = useParams<{ rankId: string }>()

	const { rank, fetching: fetchingRank, error: rankError } = useRank(rankId || "")
	const { options, fetching: fetchingOptions, error: optionsError } = useOptionsOfRank(rankId || "")
	const { tiers, fetching: fetchingTiers, error: tiersError } = useTiersOfRank(rankId || "")

	const fetching = fetchingRank || fetchingOptions || fetchingTiers
	const error = rankError || optionsError || tiersError

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !rank ? "Entity not found!" : null}
				{!fetching && !error && rank ?
					"Vote Board" :
					null
				}
			</LoadElement>
		</div>
	);
}

export default RankVotePage;