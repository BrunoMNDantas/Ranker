import React, { useState } from 'react';
import classes from './RanksPage.module.css';
import { appRankRoute } from '../../app/Routes';
import { useRanks } from '../../features/rank/hooks/UseRanks.hook';
import RanksFilteredList from '../../features/rank/components/ranksFilteredList/RanksFilteredList';
import LoadElement from '../../components/loadElement/LoadElement';
import ActionButton from '../../components/actionButton/ActionButton';
import RankCreateIcon from '../../features/rank/components/rankCreateIcon/RankCreateIcon';
import { Rank } from '../../features/rank/model/Rank.types';
import { useNavigate } from 'react-router-dom';
import { createRank } from '../../services/EntityFactory.service';
import { createRank as submitRank } from '../../features/rank/api/Rank.api';
import RankFormModal from '../../features/rank/components/rankFormModal/RankFormModal';
const RanksPage = () => {
	const navigate = useNavigate()
	const {ranks, error, fetching,} = useRanks()
	const [showRankModal, setShowRankModal] = useState(false)

	const handleCreateRankClick = () => {
		setShowRankModal(true)
		return Promise.resolve()
	}

	const handleCreateRankCancel = () => {
		setShowRankModal(false)
		return Promise.resolve()
	}

	const handleCreateRank = async (rank: Rank) => {
		const rankId = await submitRank(rank)
		setShowRankModal(false)
		navigate(appRankRoute(rankId))
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				<RanksFilteredList ranks={ranks || []} rankUrl={rank => appRankRoute(rank.id!)}/>
				{error ? error.toString() : null}
			</LoadElement>
			<ActionButton color="info" buttonAction={handleCreateRankClick}>
				<RankCreateIcon/>
			</ActionButton>
			<RankFormModal open={showRankModal} defaultRank={createRank({})} onCancel={handleCreateRankCancel} onCreate={handleCreateRank}/>
		</div>
	)
}

export default RanksPage;