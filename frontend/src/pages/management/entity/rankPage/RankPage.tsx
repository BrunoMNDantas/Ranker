import React, { useState, useCallback } from 'react';
import classes from './RankPage.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EntityPage from '../entityPage/EntityPage';
import { deleteRank, getRank, updateRank } from '../../../../features/rank/api/Rank.api';
import { getVotesOfRank, createVote } from '../../../../features/vote/api/Vote.api';
import { getTiersOfRank, createTier } from '../../../../features/tier/api/Tier.api';
import { getOptionsOfRank, createOption } from '../../../../features/option/api/Option.api';
import { Rank } from '../../../../features/rank/model/Rank.types';
import { Vote } from '../../../../features/vote/model/Vote.types';
import { Tier } from '../../../../features/tier/model/Tier.types';
import { Option } from '../../../../features/option/model/Option.types';
import TextField from '@mui/material/TextField';
import EntityForm from '../entityForm/EntityForm';
import { List, ListItem, ListItemButton, ListItemText, Typography, Divider, Button } from '@mui/material';
import { useExecute } from '../../../../hooks/UseExecute';
import { managementVoteRoute, managementTierRoute, managementOptionRoute, MANAGEMENT_RANKS_ROUTE } from '../../../../app/Routes';
import LoadElement from '../../../../components/loadElement/LoadElement';
import { createVote as createNewVote, createTier as createNewTier, createOption as createNewOption } from '../../../../services/EntityFactory.service';
import RankCard from '../../../../features/rank/components/rankCard/RankCard';

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
				<List>
					{votes?.map((vote) => (
						<ListItem
							key={vote.id}
							disablePadding
							className={classes.relatedItem}>
							<ListItemButton component={Link} to={managementVoteRoute(vote.id!)}>
								<ListItemText primary={`Vote ${vote.id}`}/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Button
					variant="contained"
					size="small"
					onClick={handleCreateVote}
					className={classes.createButton}>
					Create Vote
				</Button>
			</LoadElement>
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
				<List>
					{tiers?.map((tier) => (
						<ListItem
							key={tier.id}
							disablePadding
							className={classes.relatedItem}>
							<ListItemButton component={Link} to={managementTierRoute(tier.id!)}>
								<ListItemText primary={`${tier.title || 'Untitled Tier'}`}/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Button
					variant="contained"
					size="small"
					onClick={handleCreateTier}
					className={classes.createButton}>
					Create Tier
				</Button>
			</LoadElement>
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
				<List>
					{options?.map((option) => (
						<ListItem
							key={option.id}
							disablePadding
							className={classes.relatedItem}>
							<ListItemButton component={Link} to={managementOptionRoute(option.id!)}>
								<ListItemText primary={`${option.title || 'Untitled Option'}`}/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Button
					variant="contained"
					size="small"
					onClick={handleCreateOption}
					className={classes.createButton}>
					Create Option
				</Button>
			</LoadElement>
		</div>
	)
}

export interface RankPropertiesProps {
	rank: Rank
	onTitleChange: (title: string) => void
	onDescriptionChange: (description: string) => void
	onImageUrlChange: (imageUrl: string) => void
}

export const RankProperties = ({rank, onTitleChange, onDescriptionChange, onImageUrlChange}: RankPropertiesProps) => {
	return (
		<div className={classes.properties}>
			<TextField
				disabled={true}
				label="Id"
				type="text"
				value={rank.id}/>
			<TextField
				disabled={true}
				label="Creation Date"
				type="text"
				value={rank.creationDate?.toLocaleString()}/>
			<TextField
				label="Title"
				type="text"
				value={rank.title || ""}
				onChange={e => onTitleChange(e.target.value)}/>
			<TextField
				label="Description"
				type="text"
				multiline
				rows={3}
				value={rank.description || ""}
				onChange={e => onDescriptionChange(e.target.value)}/>
			<TextField
				label="Image URL"
				type="url"
				value={rank.imageUrl || ""}
				onChange={e => onImageUrlChange(e.target.value)}/>
			<div className={classes.relatedEntities}>
				<RankVotesList rankId={rank.id} />
				<RankTiersList rankId={rank.id} />
				<RankOptionsList rankId={rank.id} />
			</div>
		</div>
	)
}

export interface RankFormProps {
	entity: Rank
}

export const RankForm = ({entity: rank}: RankFormProps) => {
	const navigate = useNavigate()
	const [editedRank, setEditedRank] = useState(rank)

	const handleTitleChange = (title: string) => {
		if (editedRank) {
			setEditedRank({...editedRank, title})
		}
	}

	const handleDescriptionChange = (description: string) => {
		if (editedRank) {
			setEditedRank({...editedRank, description})
		}
	}

	const handleImageUrlChange = (imageUrl: string) => {
		if (editedRank) {
			setEditedRank({...editedRank, imageUrl})
		}
	}

	const handleClear = () => {
		setEditedRank(structuredClone(rank))
	}

	const handleSave = () => {
		if(editedRank) {
			updateRank(editedRank)
		}
	}

	const handleDelete = async () => {
		if(rank.id) {
			await deleteRank(rank.id)
			navigate(MANAGEMENT_RANKS_ROUTE)
		}
	}

	return (
		<EntityForm
			entity={editedRank}
			onClear={handleClear}
			onSave={handleSave}
			onDelete={handleDelete}>
			<RankProperties rank={editedRank} onTitleChange={handleTitleChange} onDescriptionChange={handleDescriptionChange} onImageUrlChange={handleImageUrlChange}/>
		</EntityForm>
	)
}

const RankPage = () => {
	const { rankId } = useParams<{ rankId: string }>();

	return (
		<EntityPage
			title="Rank Page"
			getEntity={() => rankId ? getRank(rankId) : Promise.resolve(null)}
			entityRenderer={rank => <RankCard rank={rank}/>}/>
	);
}

export default RankPage;