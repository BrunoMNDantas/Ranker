import React, { useCallback, useEffect, useState } from 'react';
import classes from './OptionPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Option } from '../../features/option/model/Option.types';
import { deleteOption, getOption, updateOption } from '../../features/option/api/Option.api';
import { APP_OPTIONS_ROUTE } from '../../app/Routes';
import LoadElement from '../../components/loadElement/LoadElement';
import OptionCard from '../../features/option/components/optionCard/OptionCard';
import { Mode } from '../../components/entityCard/EntityCard';
import { useExecute } from '../../hooks/UseExecute';

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
			navigate(APP_OPTIONS_ROUTE)
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