import React, { useEffect, useState } from 'react';
import classes from './OptionPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Option } from '../../features/option/model/Option.types';
import { deleteOption, updateOption } from '../../features/option/api/Option.api';
import { APP_OPTIONS_ROUTE } from '../../app/Routes';
import LoadElement from '../../components/loadElement/LoadElement';
import OptionCard from '../../features/option/components/optionCard/OptionCard';
import { Mode } from '../../components/entityCard/EntityCard';
import { useOption } from '../../features/option/hooks/UseOption.hook';
import { useAssignmentsOfOption } from '../../features/assignment/hooks/UseAssignmentsOfOption.hook';
import { Assignment } from '../../features/assignment/model/Assignment.types';
import { deleteAssignment } from '../../features/assignment/api/Assignment.api';

const OptionPage = () => {
	const navigate = useNavigate()
	const { optionId } = useParams<{ optionId: string }>()
	const [editedOption, setEditedOption] = useState<Option | null>(null)

	const { option, fetching: fetchingOption, error: optionError } = useOption(optionId || "")
	const { assignments, fetching: fetchingAssignments, error: assignmentsError, fetch: fetchAssignments } = useAssignmentsOfOption(optionId || "")

	const fetching = fetchingOption || fetchingAssignments
	const error = optionError || assignmentsError

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

	const handleDeleteAssignment = async (assignment: Assignment) => {
		await deleteAssignment(assignment.id!)
		fetchAssignments()
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !option ? "Entity not found!" : null}
				{!fetching && !error && editedOption ?
					<OptionCard
						option={editedOption}
						assignments={assignments || []}
						mode={Mode.EDIT}
						onOptionChange={handleOptionChange}
						onClear={handleClear}
						onSave={handleSave}
						onDelete={handleDelete}
						onDeleteAssignment={handleDeleteAssignment}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default OptionPage;