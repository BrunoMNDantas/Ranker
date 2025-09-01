import React, { useState } from 'react';
import classes from './TierPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import EntityPage from '../entityPage/EntityPage';
import { deleteTier, getTier, updateTier } from '../../../../../logic/api/Tier.api';
import { Tier } from '../../../../../logic/entities/Tier';
import TextField from '@mui/material/TextField';
import EntityForm from '../entityForm/EntityForm';
import { Button } from '@mui/material';

export interface TierPropertiesProps {
	tier: Tier | null
	onTitleChange: (title: string) => void
}

export const TierProperties = ({tier, onTitleChange}: TierPropertiesProps) => {
	const navigate = useNavigate()

	return (
		<div className={classes.properties}>
			<div className={classes.rank}>
				<div>
					<strong>Rank ID:</strong> <span>{tier?.rankId}</span>
				</div>
				<Button
					variant="outlined"
					size="small"
					onClick={() => navigate(`/management/ranks/${tier?.rankId}`)}>
					Go to Rank
				</Button>
			</div>
			<TextField
				disabled={true}
				label="Id"
				type="text"
				value={tier?.id}/>
			<TextField
				disabled={true}
				label="Creation Date"
				type="text"
				value={tier?.creationDate?.toLocaleString()}/>
			<TextField
				label="Title"
				type="text"
				value={tier?.title}
				onChange={e => onTitleChange(e.target.value)}/>
		</div>
	)
}

export interface TierFormProps {
	entity: Tier | null
}

export const TierForm = ({entity: tier}: TierFormProps) => {
	const navigate = useNavigate()
	const [editedTier, setEditedTier] = useState(tier)

	const handleTitleChange = (title: string) => {
		if (editedTier) {
			setEditedTier({...editedTier, title})
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
		if(tier?.id) {
			await deleteTier(tier.id)
			navigate("/management/tiers")
		}
	}

	return (
		<EntityForm
			entity={editedTier}
			onClear={handleClear}
			onSave={handleSave}
			onDelete={handleDelete}>
			<TierProperties tier={editedTier} onTitleChange={handleTitleChange}/>
		</EntityForm>
	)
}

const TierPage = () => {
	const { tierId } = useParams<{ tierId: string }>();

	return (
		<EntityPage
			title="Tier Page"
			getEntity={() => tierId ? getTier(tierId) : Promise.resolve(null)}
			EntityComponent={TierForm}/>
	);
}

export default TierPage;