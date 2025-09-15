import React, { useCallback, useEffect, useState } from 'react';
import classes from './OptionPage.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteOption, getOption, updateOption } from '../../../../features/option/api/Option.api';
import { Option } from '../../../../features/option/model/Option.types';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { MANAGEMENT_OPTIONS_ROUTE, managementRankRoute } from '../../../../app/Routes';
import OptionCard from '../../../../features/option/components/optionCard/OptionCard';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { useExecute } from '../../../../hooks/UseExecute';
import LoadElement from '../../../../components/loadElement/LoadElement';

export interface OptionPropertiesProps {
	option: Option
	onTitleChange: (title: string) => void
	onDescriptionChange: (description: string) => void
	onImageUrlChange: (imageUrl: string) => void
}

export const OptionProperties = ({option, onTitleChange, onDescriptionChange, onImageUrlChange}: OptionPropertiesProps) => {
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
				value={option.title || ""}
				onChange={e => onTitleChange(e.target.value)}/>
			<TextField
				label="Description"
				type="text"
				multiline
				rows={3}
				value={option.description || ""}
				onChange={e => onDescriptionChange(e.target.value)}/>
			<TextField
				label="Image URL"
				type="url"
				value={option.imageUrl || ""}
				onChange={e => onImageUrlChange(e.target.value)}/>
		</div>
	)
}

const OptionPage = () => {
	const navigate = useNavigate()
	const { optionId } = useParams<{ optionId: string }>()
	const getOptionCallback = useCallback(() => optionId ? getOption(optionId) : Promise.resolve(null), [optionId])
	const { result: option, executing, error } = useExecute(getOptionCallback)
	const [editedOption, setEditedOption] = useState<Option | null>(null)

	useEffect(() => {
		if(!editedOption) {
			setEditedOption(structuredClone(option))
		}
	}, [editedOption, option])

	const handleOptionChange = (changedOption: Option) => {
		setEditedOption(changedOption)
	}

	const handleClear = () => {
		setEditedOption(structuredClone(option))
		return Promise.resolve()
	}

	const handleSave = () => {
		if (editedOption) {
			return updateOption(editedOption)
		}
		return Promise.resolve()
	}

	const handleDelete = async () => {
		if (option?.id) {
			await deleteOption(option.id)
			navigate(MANAGEMENT_OPTIONS_ROUTE)
		}
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={executing}>
				{!executing && error ? error.toString() : null}
				{!executing && !error && !option ? "Entity not found!" : null}
				{!executing && !error && editedOption ?
					<OptionCard
						option={editedOption}
						mode={Mode.EDIT}
						onOptionChange={handleOptionChange}
						onClear={handleClear}
						onSave={handleSave}
						onDelete={handleDelete}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default OptionPage;