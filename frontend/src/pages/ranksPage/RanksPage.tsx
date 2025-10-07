import React, { useState } from 'react';
import classes from './RanksPage.module.css';
import { appRankRoute } from '../../app/Routes';
import { useRanksPageData } from '../../features/rank/hooks/UseRanksPage.hook';
import RanksFilteredList from '../../features/rank/components/ranksFilteredList/RanksFilteredList';
import LoadElement from '../../components/loadElement/LoadElement';
import ActionButton from '../../components/actionButton/ActionButton';
import RankCreateIcon from '../../features/rank/components/rankCreateIcon/RankCreateIcon';
import { Rank } from '../../features/rank/model/Rank.types';
import { useNavigate } from 'react-router-dom';
import { createRank } from '../../services/EntityFactory.service';
import { createRankThunk } from '../../features/rank/store/Rank.thunks';
import RankFormModal from '../../features/rank/components/rankFormModal/RankFormModal';
import { useAppDispatch } from '../../app/hooks';

const RanksPage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { ranks, error, fetching } = useRanksPageData()
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
		const result = await dispatch(createRankThunk(rank)).unwrap()
		setShowRankModal(false)
		navigate(appRankRoute(result.id))
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				<RanksFilteredList rankIds={ranks.map(r => r.id)} rankUrl={rank => appRankRoute(rank.id)}/>
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