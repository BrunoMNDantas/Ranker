import { useState } from 'react';
import classes from './RanksPage.module.css';
import { appRankRoute } from '../../app/Routes';
import { useRanksPageData } from '../../features/rank/hooks/UseRanksPage.hook';
import RanksFilteredList from '../../features/rank/components/ranksFilteredList/RanksFilteredList';
import LoadElement from '../../components/loadElement/LoadElement';
import ActionButton from '../../components/actionButton/ActionButton';
import RankCreateIcon from '../../features/rank/components/rankCreateIcon/RankCreateIcon';
import { useNavigate } from 'react-router-dom';
import { createRank } from '../../services/EntityFactory.service';
import { createRankThunk } from '../../features/rank/store/Rank.thunks';
import { addRank, deleteRank } from '../../features/rank/store/Rank.slice';
import RankFormModal from '../../features/rank/components/rankFormModal/RankFormModal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAllRanks } from '../../features/rank/store/Rank.selectors';

const RanksPage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { error, fetching } = useRanksPageData()
	const ranks = useAppSelector(selectAllRanks)
	const [tempRankId, setTempRankId] = useState<string | null>(null)

	const handleCreateRankClick = async () => {
		const newRank = createRank({ id: crypto.randomUUID() })
		setTempRankId(newRank.id)
		dispatch(addRank(newRank))
	}

	const handleModalCancel = async () => {
		if (tempRankId) {
			dispatch(deleteRank(tempRankId))
			setTempRankId(null)
		}
	}

	const handleModalCreate = async () => {
		if (tempRankId) {
			const rank = ranks.find(r => r.id === tempRankId)
			if (rank) {
				const result = await dispatch(createRankThunk(rank)).unwrap()
				setTempRankId(null)
				navigate(appRankRoute(result.id))
			}
		}
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
			{ tempRankId ? <RankFormModal rankId={tempRankId} onCancel={handleModalCancel} onCreate={handleModalCreate}/> : null }
		</div>
	)
}

export default RanksPage;