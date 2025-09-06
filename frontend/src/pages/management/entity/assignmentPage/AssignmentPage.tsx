import React, { useState } from 'react';
import classes from './AssignmentPage.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EntityPage from '../entityPage/EntityPage';
import { deleteAssignment, getAssignment, updateAssignment } from '../../../../features/assignment/api/Assignment.api';
import { Assignment } from '../../../../features/assignment/model/Assignment.types';
import TextField from '@mui/material/TextField';
import EntityForm from '../entityForm/EntityForm';
import { Button } from '@mui/material';
import { MANAGEMENT_ASSIGNMENTS_ROUTE, managementOptionRoute, managementTierRoute, managementVoteRoute } from '../../../../app/Routes';
import AssignmentCard from '../../../../features/assignment/components/assignmentCard/AssignmentCard';

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

export interface AssignmentFormProps {
	entity: Assignment
}

export const AssignmentForm = ({entity: assignment}: AssignmentFormProps) => {
	const navigate = useNavigate()
	const [editedAssignment, setEditedAssignment] = useState(assignment)

	const handleClear = () => {
		setEditedAssignment(structuredClone(assignment))
	}

	const handleSave = () => {
		if(editedAssignment) {
			updateAssignment(editedAssignment)
		}
	}

	const handleDelete = async () => {
		if(assignment.id) {
			await deleteAssignment(assignment.id)
			navigate(MANAGEMENT_ASSIGNMENTS_ROUTE)
		}
	}

	return (
		<EntityForm
			entity={editedAssignment}
			onClear={handleClear}
			onSave={handleSave}
			onDelete={handleDelete}>
			<AssignmentProperties assignment={editedAssignment}/>
		</EntityForm>
	)
}

const AssignmentPage = () => {
	const { assignmentId } = useParams<{ assignmentId: string }>();

	return (
		<EntityPage
			title="Assignment Page"
			getEntity={() => assignmentId ? getAssignment(assignmentId) : Promise.resolve(null)}
			entityRenderer={assignment => <AssignmentCard assignment={assignment}/>}/>
	);
}

export default AssignmentPage;