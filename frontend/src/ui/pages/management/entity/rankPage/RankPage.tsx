import React, { useState } from 'react';
import classes from './RankPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import EntityPage from '../entityPage/EntityPage';
import { deleteRank, getRank, updateRank } from '../../../../../logic/api/Rank.api';
import { Rank } from '../../../../../logic/entities/Rank';
import TextField from '@mui/material/TextField';
import EntityForm from '../entityForm/EntityForm';

export interface RankPropertiesProps {
	rank: Rank | null,
	onTitleChange: (title: string)=>void
}
export const RankProperties = ({rank, onTitleChange}: RankPropertiesProps) => {
	return (
		<div className={classes.properties}>
			<TextField
				disabled={true}
				label="Id"
				type="text"
				value={rank?.id}/>
			<TextField
				disabled={true}
				label="Creation Date"
				type="text"
				value={rank?.creationDate?.toLocaleString()}/>
			<TextField
				label="Title"
				type="text"
				value={rank?.title}
				onChange={e => onTitleChange(e.target.value)}/>
		</div>
	)
}

export interface RankFormProps {
	entity: Rank | null
}

export const RankForm = ({entity: rank}: RankFormProps) => {
	const navigate = useNavigate()
	const [editedRank, setEditedRank] = useState(rank)

	const handleTitleChange = (title: string) => {
		if (editedRank) {
			setEditedRank({...editedRank, title})
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
		if(rank?.id) {
			await deleteRank(rank.id)
			navigate("/management/ranks")
		}
	}

	return (
		<EntityForm
			entity={editedRank}
			onClear={handleClear}
			onSave={handleSave}
			onDelete={handleDelete}>
			<RankProperties rank={editedRank} onTitleChange={handleTitleChange}/>
		</EntityForm>
	)
}

const RankPage = () => {
	const { rankId } = useParams<{ rankId: string }>();

	return (
		<EntityPage
			title="Rank Page"
			getEntity={() => rankId ? getRank(rankId) : Promise.resolve(null)}
			EntityComponent={RankForm}/>
	);
}

export default RankPage;