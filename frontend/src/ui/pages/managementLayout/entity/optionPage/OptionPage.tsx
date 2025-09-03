import React, { useState } from 'react';
import classes from './OptionPage.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EntityPage from '../entityPage/EntityPage';
import { deleteOption, getOption, updateOption } from '../../../../../logic/api/Option.api';
import { Option } from '../../../../../logic/entities/Option';
import TextField from '@mui/material/TextField';
import EntityForm from '../entityForm/EntityForm';
import { Button } from '@mui/material';
import { MANAGEMENT_OPTIONS_ROUTE, managementRankRoute } from '../../../../../Routes';

export interface OptionPropertiesProps {
	option: Option
	onTitleChange: (title: string) => void
	onDescriptionChange: (description: string) => void
}

export const OptionProperties = ({option, onTitleChange, onDescriptionChange}: OptionPropertiesProps) => {
	return (
		<div className={classes.properties}>
			<div className={classes.rank}>
				<div>
					<strong>Rank ID:</strong> <span>{option.rankId}</span>
				</div>
				<Button
					variant="contained"
					size="small"
					component={Link}
					to={managementRankRoute(option.rankId!)}>
					Go to Rank
				</Button>
			</div>
			<TextField
				disabled={true}
				label="Id"
				type="text"
				value={option.id}/>
			<TextField
				disabled={true}
				label="Creation Date"
				type="text"
				value={option.creationDate?.toLocaleString()}/>
			<TextField
				label="Title"
				type="text"
				value={option.title}
				onChange={e => onTitleChange(e.target.value)}/>
			<TextField
				label="Description"
				type="text"
				multiline
				rows={3}
				value={option.description}
				onChange={e => onDescriptionChange(e.target.value)}/>
		</div>
	)
}

export interface OptionFormProps {
	entity: Option
}

export const OptionForm = ({entity: option}: OptionFormProps) => {
	const navigate = useNavigate()
	const [editedOption, setEditedOption] = useState(option)

	const handleTitleChange = (title: string) => {
		if (editedOption) {
			setEditedOption({...editedOption, title})
		}
	}

	const handleDescriptionChange = (description: string) => {
		if (editedOption) {
			setEditedOption({...editedOption, description})
		}
	}

	const handleClear = () => {
		setEditedOption(structuredClone(option))
	}

	const handleSave = () => {
		if(editedOption) {
			updateOption(editedOption)
		}
	}

	const handleDelete = async () => {
		if(option.id) {
			await deleteOption(option.id)
			navigate(MANAGEMENT_OPTIONS_ROUTE)
		}
	}

	return (
		<EntityForm
			entity={editedOption}
			onClear={handleClear}
			onSave={handleSave}
			onDelete={handleDelete}>
			<OptionProperties option={editedOption} onTitleChange={handleTitleChange} onDescriptionChange={handleDescriptionChange}/>
		</EntityForm>
	)
}

const OptionPage = () => {
	const { optionId } = useParams<{ optionId: string }>();

	return (
		<EntityPage
			title="Option Page"
			getEntity={() => optionId ? getOption(optionId) : Promise.resolve(null)}
			EntityForm={OptionForm}/>
	);
}

export default OptionPage;