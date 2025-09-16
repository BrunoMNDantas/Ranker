import React, { useState, useCallback, useEffect } from 'react';
import classes from './RankPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteRank, getRank, updateRank } from '../../features/rank/api/Rank.api';
import { useExecute } from '../../hooks/UseExecute';
import { Rank } from '../../features/rank/model/Rank.types';
import LoadElement from '../../components/loadElement/LoadElement';
import RankCard from '../../features/rank/components/rankCard/RankCard';
import { Mode } from '../../components/entityCard/EntityCard';
import { APP_RANKS_ROUTE } from '../../app/Routes';

const RankPage = () => {
	const navigate = useNavigate()
	const { rankId } = useParams<{ rankId: string }>()
	const [editedRank, setEditedRank] = useState<Rank | null>(null)
	const getRankCallback = useCallback(() => rankId ? getRank(rankId) : Promise.resolve(null), [rankId])
	const { result: rank, executing, error } = useExecute(getRankCallback)

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
			<LoadElement loading={executing}>
				{!executing && error ? error.toString() : null}
				{!executing && !error && !rank ? "Entity not found!" : null}
				{!executing && !error && editedRank ?
					<RankCard
						rank={editedRank}
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