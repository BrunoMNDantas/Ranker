import React, { useCallback, useEffect, useState } from 'react';
import classes from './TierPage.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteTier, getTier, updateTier } from '../../../../features/tier/api/Tier.api';
import { Tier } from '../../../../features/tier/model/Tier.types';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { MANAGEMENT_TIERS_ROUTE, managementRankRoute } from '../../../../app/Routes';
import TierCard from '../../../../features/tier/components/tierCard/TierCard';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { useExecute } from '../../../../hooks/UseExecute';
import LoadElement from '../../../../components/loadElement/LoadElement';

export interface TierPropertiesProps {
	tier: Tier
	onTitleChange: (title: string) => void
	onDescriptionChange: (description: string) => void
	onImageUrlChange: (imageUrl: string) => void
}

export const TierProperties = ({tier, onTitleChange, onDescriptionChange, onImageUrlChange}: TierPropertiesProps) => {
	return (
		<div className={classes.properties}>
			<div className={classes.rank}>
				<div>
					<strong>Rank ID:</strong> <span>{tier.rankId}</span>
				</div>
				<Button
					variant="contained"
					size="small"
					component={Link}
					to={managementRankRoute(tier.rankId!)}>
					Go to Rank
				</Button>
			</div>
			<TextField
				disabled={true}
				label="Id"
				type="text"
				value={tier.id}/>
			<TextField
				disabled={true}
				label="Creation Date"
				type="text"
				value={tier.creationDate?.toLocaleString()}/>
			<TextField
				label="Title"
				type="text"
				value={tier.title || ""}
				onChange={e => onTitleChange(e.target.value)}/>
			<TextField
				label="Description"
				type="text"
				multiline
				rows={3}
				value={tier.description || ""}
				onChange={e => onDescriptionChange(e.target.value)}/>
			<TextField
				label="Image URL"
				type="url"
				value={tier.imageUrl || ""}
				onChange={e => onImageUrlChange(e.target.value)}/>
		</div>
	)
}

const TierPage = () => {
	const navigate = useNavigate()
	const { tierId } = useParams<{ tierId: string }>()
	const getTierCallback = useCallback(() => tierId ? getTier(tierId) : Promise.resolve(null), [tierId])
	const { result: tier, executing, error } = useExecute(getTierCallback)
	const [editedTier, setEditedTier] = useState<Tier | null>(null)

	useEffect(() => {
		if(!editedTier) {
			setEditedTier(structuredClone(tier))
		}
	}, [editedTier, tier])


	const handleTierChange = (changedTier: Tier) => {
		setEditedTier(changedTier)
	}

	const handleClear = () => {
		setEditedTier(structuredClone(tier))
		return Promise.resolve()
	}

	const handleSave = () => {
		if (editedTier) {
			return updateTier(editedTier)
		}
		return Promise.resolve()
	}

	const handleDelete = async () => {
		if (tier?.id) {
			await deleteTier(tier.id)
			navigate(MANAGEMENT_TIERS_ROUTE)
		}
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={executing}>
				{!executing && error ? error.toString() : null}
				{!executing && !error && !tier ? "Entity not found!" : null}
				{!executing && !error && editedTier ?
					<TierCard
						tier={editedTier}
						mode={Mode.EDIT}
						onTierChange={handleTierChange}
						onClear={handleClear}
						onSave={handleSave}
						onDelete={handleDelete}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default TierPage;