import React, { useState, useEffect } from 'react';
import classes from './RankPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Rank } from '../../features/rank/model/Rank.types';
import LoadElement from '../../components/loadElement/LoadElement';
import RankCard from '../../features/rank/components/rankCard/RankCard';
import { Mode } from '../../components/entityCard/EntityCard';
import { APP_RANKS_ROUTE } from '../../app/Routes';
import { useRankPageData } from '../../features/rank/hooks/UseRankPage.hook';
import { Tier } from '../../features/tier/model/Tier.types';
import { Option } from '../../features/option/model/Option.types';
import { Vote } from '../../features/vote/model/Vote.types';
import { createOption, createTier } from '../../services/EntityFactory.service';
import TierFormModal from '../../features/tier/components/tierFormModal/TierFormModal';
import OptionFormModal from '../../features/option/components/optionFormModal/OptionFormModal';
import { useAuth } from '../../features/auth/components/AuthContext';
import { createOptionThunk, updateOptionThunk, deleteOptionThunk } from '../../features/option/store/Option.thunks';
import { createTierThunk, updateTierThunk, deleteTierThunk } from '../../features/tier/store/Tier.thunks';
import { deleteVoteThunk } from '../../features/vote/store/Vote.thunks';
import { updateRankThunk, deleteRankThunk } from '../../features/rank/store/Rank.thunks';
import { useAppDispatch } from '../../app/hooks';

const RankPage = () => {
	const navigate = useNavigate()
	const auth = useAuth()
	const dispatch = useAppDispatch()
	const { rankId } = useParams<{ rankId: string }>()
	const [editedRank, setEditedRank] = useState<Rank | null>(null)
	const [showTierModal, setShowTierModal] = useState(false)
	const [showOptionModal, setShowOptionModal] = useState(false)

	const { rank, options, tiers, votes, fetching, error } = useRankPageData(rankId || "")

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

	const handleSave = async () => {
		if (editedRank) {
			await dispatch(updateRankThunk(editedRank)).unwrap()
		}
	}

	const handleTierChange = async (tier: Tier) => {
		await dispatch(updateTierThunk(tier)).unwrap()
	}

	const handleOptionChange = async (option: Option) => {
		await dispatch(updateOptionThunk(option)).unwrap()
	}

	const handleDelete = async () => {
		if (rank) {
			await dispatch(deleteRankThunk(rank.id)).unwrap()
			navigate(APP_RANKS_ROUTE)
		}
	}

	const handleDeleteTier = async (tier: Tier) => {
		await dispatch(deleteTierThunk(tier.id)).unwrap()
	}

	const handleDeleteOption = async (option: Option) => {
		await dispatch(deleteOptionThunk(option.id)).unwrap()
	}

	const handleDeleteVote = async (vote: Vote) => {
		await dispatch(deleteVoteThunk(vote.id)).unwrap()
	}

	const handleCreateTierClick = () => {
		setShowTierModal(true)
		return Promise.resolve()
	}

	const handleCreateOptionClick = () => {
		setShowOptionModal(true)
		return Promise.resolve()
	}

	const handleCreateTierCancel = () => {
		setShowTierModal(false)
		return Promise.resolve()
	}

	const handleCreateOptionCancel = () => {
		setShowOptionModal(false)
		return Promise.resolve()
	}

	const handleCreateTier = async (tier: Tier) => {
		await dispatch(createTierThunk(tier)).unwrap()
		setShowTierModal(false)
	}

	const handleCreateOption = async (option: Option) => {
		await dispatch(createOptionThunk(option)).unwrap()
		setShowOptionModal(false)
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !rank ? "Entity not found!" : null}
				{!fetching && !error && editedRank ?
					<RankCard
						rank={editedRank}
						tiers={tiers}
						options={options}
						votes={votes}
						mode={auth.userId === editedRank.ownerId ? Mode.EDIT : Mode.VIEW}
						onRankChange={handleRankChange}
						onClear={handleClear}
						onSave={handleSave}
						onDelete={handleDelete}
						onCreateTier={handleCreateTierClick}
						onTierChange={handleTierChange}
						onDeleteTier={handleDeleteTier}
						onCreateOption={handleCreateOptionClick}
						onOptionChange={handleOptionChange}
						onDeleteOption={handleDeleteOption}
						onDeleteVote={handleDeleteVote}/> :
					null
				}
			</LoadElement>
			<TierFormModal
				open={showTierModal}
				defaultTier={createTier({rankId, order: tiers.length})}
				onCancel={handleCreateTierCancel}
				onCreate={handleCreateTier}/>
			<OptionFormModal
				open={showOptionModal}
				defaultOption={createOption({rankId, order: options.length})}
				onCancel={handleCreateOptionCancel}
				onCreate={handleCreateOption}/>
		</div>
	);
}

export default RankPage;