import React, { useState } from 'react';
import classes from './TierPage.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EntityPage from '../entityPage/EntityPage';
import { deleteTier, getTier, updateTier } from '../../../../../logic/api/Tier.api';
import { Tier } from '../../../../../logic/entities/Tier';
import TextField from '@mui/material/TextField';
import EntityForm from '../entityForm/EntityForm';
import { Button } from '@mui/material';
import { MANAGEMENT_TIERS_ROUTE, managementRankRoute } from '../../../../../Routes';

export interface TierPropertiesProps {
	tier: Tier
	onTitleChange: (title: string) => void
	onDescriptionChange: (description: string) => void
}

export const TierProperties = ({tier, onTitleChange, onDescriptionChange}: TierPropertiesProps) => {
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
				value={tier.title}
				onChange={e => onTitleChange(e.target.value)}/>
			<TextField
				label="Description"
				type="text"
				multiline
				rows={3}
				value={tier.description}
				onChange={e => onDescriptionChange(e.target.value)}/>
		</div>
	)
}

export interface TierFormProps {
	entity: Tier
}

export const TierForm = ({entity: tier}: TierFormProps) => {
	const navigate = useNavigate()
	const [editedTier, setEditedTier] = useState(tier)

	const handleTitleChange = (title: string) => {
		if (editedTier) {
			setEditedTier({...editedTier, title})
		}
	}

	const handleDescriptionChange = (description: string) => {
		if (editedTier) {
			setEditedTier({...editedTier, description})
		}
	}

	const handleClear = () => {
		setEditedTier(structuredClone(tier))
	}

	const handleSave = () => {
		if(editedTier) {
			updateTier(editedTier)
		}
	}

	const handleDelete = async () => {
		if(tier.id) {
			await deleteTier(tier.id)
			navigate(MANAGEMENT_TIERS_ROUTE)
		}
	}

	return (
		<EntityForm
			entity={editedTier}
			onClear={handleClear}
			onSave={handleSave}
			onDelete={handleDelete}>
			<TierProperties tier={editedTier} onTitleChange={handleTitleChange} onDescriptionChange={handleDescriptionChange}/>
		</EntityForm>
	)
}

const TierPage = () => {
	const { tierId } = useParams<{ tierId: string }>();

	return (
		<EntityPage
			title="Tier Page"
			getEntity={() => tierId ? getTier(tierId) : Promise.resolve(null)}
			EntityForm={TierForm}/>
	);
}

export default TierPage;