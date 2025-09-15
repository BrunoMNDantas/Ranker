import React, { useCallback, useEffect, useState } from 'react';
import classes from './AssignmentPage.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteAssignment, getAssignment, updateAssignment } from '../../../../features/assignment/api/Assignment.api';
import { Assignment } from '../../../../features/assignment/model/Assignment.types';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { MANAGEMENT_ASSIGNMENTS_ROUTE, managementOptionRoute, managementTierRoute, managementVoteRoute } from '../../../../app/Routes';
import AssignmentCard from '../../../../features/assignment/components/assignmentCard/AssignmentCard';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { useExecute } from '../../../../hooks/UseExecute';
import LoadElement from '../../../../components/loadElement/LoadElement';

export interface AssignmentPropertiesProps {
	assignment: Assignment
}

export const AssignmentProperties = ({assignment}: AssignmentPropertiesProps) => {
	return (
		<div className={classes.properties}>
			<div className={classes.vote}>
				<div>
					<strong>Vote ID:</strong> <span>{assignment.voteId}</span>
				</div>
				<Button
					variant="contained"
					size="small"
					component={Link}
					to={managementVoteRoute(assignment.voteId!)}>
					Go to Vote
				</Button>
			</div>
			<TextField
				disabled={true}
				label="Id"
				type="text"
				value={assignment.id}/>
			<TextField
				disabled={true}
				label="Creation Date"
				type="text"
				value={assignment.creationDate?.toLocaleString()}/>
			<div className={classes.option}>
				<div>
					<strong>Option ID:</strong> <span>{assignment.optionId}</span>
				</div>
				<Button
					variant="contained"
					size="small"
					component={Link}
					to={managementOptionRoute(assignment.optionId!)}>
					Go to Option
				</Button>
			</div>
			<div className={classes.tier}>
				<div>
					<strong>Tier ID:</strong> <span>{assignment.tierId}</span>
				</div>
				<Button
					variant="contained"
					size="small"
					component={Link}
					to={managementTierRoute(assignment.tierId!)}>
					Go to Tier
				</Button>
			</div>
		</div>
	)
}

const AssignmentPage = () => {
	const navigate = useNavigate()
	const { assignmentId } = useParams<{ assignmentId: string }>()
	const getAssignmentCallback = useCallback(() => assignmentId ? getAssignment(assignmentId) : Promise.resolve(null), [assignmentId])
	const { result: assignment, executing, error } = useExecute(getAssignmentCallback)
	const [editedAssignment, setEditedAssignment] = useState<Assignment | null>(null)

	useEffect(() => {
		if(!editedAssignment) {
			setEditedAssignment(structuredClone(assignment))
		}
	}, [editedAssignment, assignment])

	const handleAssignmentChange = (changedAssignment: Assignment) => {
		setEditedAssignment(changedAssignment)
	}

	const handleClear = () => {
		setEditedAssignment(structuredClone(assignment))
		return Promise.resolve()
	}

	const handleSave = () => {
		if (editedAssignment) {
			return updateAssignment(editedAssignment)
		}
		return Promise.resolve()
	}

	const handleDelete = async () => {
		if (assignment?.id) {
			await deleteAssignment(assignment.id)
			navigate(MANAGEMENT_ASSIGNMENTS_ROUTE)
		}
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={executing}>
				{!executing && error ? error.toString() : null}
				{!executing && !error && !assignment ? "Entity not found!" : null}
				{!executing && !error && editedAssignment ?
					<AssignmentCard
						assignment={editedAssignment}
						mode={Mode.EDIT}
						onAssignmentChange={handleAssignmentChange}
						onClear={handleClear}
						onSave={handleSave}
						onDelete={handleDelete}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default AssignmentPage;