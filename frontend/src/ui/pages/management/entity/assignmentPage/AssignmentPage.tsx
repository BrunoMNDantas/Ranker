import React, { useState } from 'react';
import classes from './AssignmentPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import EntityPage from '../entityPage/EntityPage';
import { deleteAssignment, getAssignment, updateAssignment } from '../../../../../logic/api/Assignment.api';
import { Assignment } from '../../../../../logic/entities/Assignment';
import TextField from '@mui/material/TextField';
import EntityForm from '../entityForm/EntityForm';
import { Button } from '@mui/material';

export interface AssignmentPropertiesProps {
	assignment: Assignment | null
}

export const AssignmentProperties = ({assignment}: AssignmentPropertiesProps) => {
	const navigate = useNavigate()

	return (
		<div className={classes.properties}>
			<div className={classes.vote}>
				<div>
					<strong>Vote ID:</strong> <span>{assignment?.voteId}</span>
				</div>
				<Button
					variant="outlined"
					size="small"
					onClick={() => navigate(`/management/votes/${assignment?.voteId}`)}>
					Go to Vote
				</Button>
			</div>
			<TextField
				disabled={true}
				label="Id"
				type="text"
				value={assignment?.id}/>
			<TextField
				disabled={true}
				label="Creation Date"
				type="text"
				value={assignment?.creationDate?.toLocaleString()}/>
			<div className={classes.option}>
				<div>
					<strong>Option ID:</strong> <span>{assignment?.optionId}</span>
				</div>
				<Button
					variant="outlined"
					size="small"
					onClick={() => navigate(`/management/options/${assignment?.optionId}`)}>
					Go to Option
				</Button>
			</div>
			<div className={classes.tier}>
				<div>
					<strong>Tier ID:</strong> <span>{assignment?.tierId}</span>
				</div>
				<Button
					variant="outlined"
					size="small"
					onClick={() => navigate(`/management/tiers/${assignment?.tierId}`)}>
					Go to Tier
				</Button>
			</div>
		</div>
	)
}

export interface AssignmentFormProps {
	entity: Assignment | null
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
		if(assignment?.id) {
			await deleteAssignment(assignment.id)
			navigate("/management/assignments")
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
			EntityComponent={AssignmentForm}/>
	);
}

export default AssignmentPage;