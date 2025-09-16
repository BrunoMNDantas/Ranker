import React, { useState, useCallback, useEffect } from 'react';
import classes from './RankPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteRank, getRank, updateRank } from '../../../../features/rank/api/Rank.api';
import { getVotesOfRank, createVote } from '../../../../features/vote/api/Vote.api';
import { getTiersOfRank, createTier } from '../../../../features/tier/api/Tier.api';
import { getOptionsOfRank, createOption } from '../../../../features/option/api/Option.api';
import { Rank } from '../../../../features/rank/model/Rank.types';
import { Vote } from '../../../../features/vote/model/Vote.types';
import { Tier } from '../../../../features/tier/model/Tier.types';
import { Option } from '../../../../features/option/model/Option.types';
import { Typography, Divider, Button } from '@mui/material';
import { useExecute } from '../../../../hooks/UseExecute';
import { managementVoteRoute, managementTierRoute, managementOptionRoute, MANAGEMENT_RANKS_ROUTE } from '../../../../app/Routes';
import LoadElement from '../../../../components/loadElement/LoadElement';
import { createVote as createNewVote, createTier as createNewTier, createOption as createNewOption } from '../../../../services/EntityFactory.service';
import RankCard from '../../../../features/rank/components/rankCard/RankCard';
import { Mode } from '../../../../components/entityCard/EntityCard';
import OptionsList from '../../../../features/option/components/optionsList/OptionsList';
import TiersList from '../../../../features/tier/components/tiersList/TiersList';
import VotesList from '../../../../features/vote/components/votesList/VotesList';

export interface RankVotesListProps {
	rankId: string | null
}

export const RankVotesList = ({ rankId }: RankVotesListProps) => {
	const navigate = useNavigate()
	const getVotes = useCallback(() => rankId ? getVotesOfRank(rankId) : Promise.resolve([]), [rankId])
	const { result: votes, executing, error } = useExecute<Vote[]>(getVotes)

	const handleCreateVote = async () => {
		if (rankId) {
			const newVote = createNewVote({ rankId })
			const createdId = await createVote(newVote)
			navigate(managementVoteRoute(createdId))
		}
	}

	return (
		<div className={classes.relatedContainer}>
			<Typography variant="h6" gutterBottom>
				Votes:
			</Typography>
			<Divider />
			<LoadElement loading={executing}>
				{error ? <Typography color="error">Error loading votes: {error.message}</Typography> : null}
				{votes ? <VotesList votes={votes} voteUrl={vote => managementVoteRoute(vote.id!)} /> : null}
			</LoadElement>
			<Button
				variant="contained"
				size="small"
				onClick={handleCreateVote}
				className={classes.createButton}>
				Create Vote
			</Button>
		</div>
	)
}

export interface RankTiersListProps {
	rankId: string | null
}

export const RankTiersList = ({ rankId }: RankTiersListProps) => {
	const navigate = useNavigate()
	const getTiers = useCallback(() => rankId ? getTiersOfRank(rankId) : Promise.resolve([]), [rankId])
	const { result: tiers, executing, error } = useExecute<Tier[]>(getTiers)

	const handleCreateTier = async () => {
		if (rankId) {
			const newTier = createNewTier({ rankId })
			const createdId = await createTier(newTier)
			navigate(managementTierRoute(createdId))
		}
	}

	return (
		<div className={classes.relatedContainer}>
			<Typography variant="h6" gutterBottom>
				Tiers:
			</Typography>
			<Divider />
			<LoadElement loading={executing}>
				{error ? <Typography color="error">Error loading tiers: {error.message}</Typography> : null}
				{tiers ? <TiersList tiers={tiers} tierUrl={tier => managementTierRoute(tier.id!)}/> : null}
			</LoadElement>
			<Button
				variant="contained"
				size="small"
				onClick={handleCreateTier}
				className={classes.createButton}>
				Create Tier
			</Button>
		</div>
	)
}

export interface RankOptionsListProps {
	rankId: string | null
}

export const RankOptionsList = ({ rankId }: RankOptionsListProps) => {
	const navigate = useNavigate()
	const getOptions = useCallback(() => rankId ? getOptionsOfRank(rankId) : Promise.resolve([]), [rankId])
	const { result: options, executing, error } = useExecute<Option[]>(getOptions)

	const handleCreateOption = async () => {
		if (rankId) {
			const newOption = createNewOption({ rankId })
			const createdId = await createOption(newOption)
			navigate(managementOptionRoute(createdId))
		}
	}

	return (
		<div className={classes.relatedContainer}>
			<Typography variant="h6" gutterBottom>
				Options:
			</Typography>
			<Divider />
			<LoadElement loading={executing}>
				{error ? <Typography color="error">Error loading options: {error.message}</Typography> : null}
				{options ? <OptionsList options={options} optionUrl={option => managementOptionRoute(option.id!)}/> : null}
			</LoadElement>
			<Button
				variant="contained"
				size="small"
				onClick={handleCreateOption}
				className={classes.createButton}>
				Create Option
			</Button>
		</div>
	)
}

const RankPage = () => {
	const navigate = useNavigate()
	const { rankId } = useParams<{ rankId: string }>()
	const getRankCallback = useCallback(() => rankId ? getRank(rankId) : Promise.resolve(null), [rankId])
	const { result: rank, executing, error } = useExecute(getRankCallback)
	const [editedRank, setEditedRank] = useState<Rank | null>(null)

	useEffect(() => {
		if(!editedRank) {
			setEditedRank(structuredClone(rank))
		}
	}, [editedRank, rank])

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
			navigate(MANAGEMENT_RANKS_ROUTE)
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
			<div className={classes.relatedContainers}>
				{rankId ? <div className={classes.relatedItem}><RankOptionsList rankId={rankId}/></div> : null}
				{rankId ? <div className={classes.relatedItem}><RankTiersList rankId={rankId}/></div> : null}
				{rankId ? <div className={classes.relatedItem}><RankVotesList rankId={rankId}/></div> : null}
			</div>
		</div>
	);
}

export default RankPage;