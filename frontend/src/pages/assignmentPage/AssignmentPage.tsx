import React, { useEffect, useState } from 'react';
import classes from './AssignmentPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteAssignment, updateAssignment } from '../../features/assignment/api/Assignment.api';
import { Assignment } from '../../features/assignment/model/Assignment.types';
import { APP_ASSIGNMENTS_ROUTE } from '../../app/Routes';
import LoadElement from '../../components/loadElement/LoadElement';
import AssignmentCard from '../../features/assignment/components/assignmentCard/AssignmentCard';
import { Mode } from '../../components/entityCard/EntityCard';
import { useAssignmentPageData } from '../../features/assignment/hooks/UseAssignmentPage.hook';
import { useAuth } from '../../features/auth/components/AuthContext';

const AssignmentPage = () => {
	const navigate = useNavigate()
	const auth = useAuth()
	const { assignmentId } = useParams<{ assignmentId: string }>()
	const { assignment, fetching, error } = useAssignmentPageData(assignmentId || "")
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
			navigate(APP_ASSIGNMENTS_ROUTE)
		}
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !assignment ? "Entity not found!" : null}
				{!fetching && !error && editedAssignment ?
					<AssignmentCard
						assignment={editedAssignment}
						mode={auth.userId === editedAssignment.ownerId ? Mode.EDIT : Mode.VIEW}
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