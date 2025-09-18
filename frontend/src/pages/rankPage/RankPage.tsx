import React, { useState, useEffect } from 'react';
import classes from './RankPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteRank, updateRank } from '../../features/rank/api/Rank.api';
import { Rank } from '../../features/rank/model/Rank.types';
import LoadElement from '../../components/loadElement/LoadElement';
import RankCard from '../../features/rank/components/rankCard/RankCard';
import { Mode } from '../../components/entityCard/EntityCard';
import { APP_RANKS_ROUTE } from '../../app/Routes';
import { useRank } from '../../features/rank/hooks/UseRank.hook';
import { useOptionsOfRank } from '../../features/option/hooks/UseOptionsOfRank.hook';
import { useTiersOfRank } from '../../features/tier/hooks/UseTiersOfRank.hook';
import { useVotesOfRank } from '../../features/vote/hooks/UseVotesOfRank.hook';

const RankPage = () => {
	const navigate = useNavigate()
	const { rankId } = useParams<{ rankId: string }>()
	const [editedRank, setEditedRank] = useState<Rank | null>(null)

	const { rank, fetching: fetchingRank, error: rankError } = useRank(rankId || "")
	const { options, fetching: fetchingOptions, error: optionsError } = useOptionsOfRank(rankId || "")
	const { tiers, fetching: fetchingTiers, error: tiersError } = useTiersOfRank(rankId || "")
	const { votes, fetching: fetchingVotes, error: votesError } = useVotesOfRank(rankId || "")

	const fetching = fetchingRank || fetchingOptions || fetchingTiers || fetchingVotes
	const error = rankError || optionsError || tiersError || votesError

	useEffect(() => {
		if(!editedRank) {
			setEditedRank(structuredClone(rank))
		}
	}, [setEditedRank, editedRank, rank])

	const handleRankChange = (changedRank: Rank) => {
		setEditedRank(changedRank)
	}

	const handleClear = () => {
		setEditedRank(structuredClone(rank))
		return Promise.resolve()
	}

	const handleSave = () => {
		if (editedRank) {
			return updateRank(editedRank)
		}
		return Promise.resolve()
	}

	const handleDelete = async () => {
		if (rank?.id) {
			await deleteRank(rank.id)
			navigate(APP_RANKS_ROUTE)
		}
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !rank ? "Entity not found!" : null}
				{!fetching && !error && editedRank ?
					<RankCard
						rank={editedRank}
						tiers={tiers || []}
						options={options || []}
						votes={votes || []}
						mode={Mode.EDIT}
						onRankChange={handleRankChange}
						onClear={handleClear}
						onSave={handleSave}
						onDelete={handleDelete}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default RankPage;