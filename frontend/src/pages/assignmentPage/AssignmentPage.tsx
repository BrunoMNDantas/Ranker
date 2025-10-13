import React from 'react';
import classes from './AssignmentPage.module.css';
import { useParams } from 'react-router-dom';
import LoadElement from '../../components/loadElement/LoadElement';
import AssignmentCard from '../../features/assignment/components/assignmentCard/AssignmentCard';
import { Mode } from '../../components/entityCard/EntityCard';
import { useAssignmentPageData } from '../../features/assignment/hooks/UseAssignmentPage.hook';
import { useAuth } from '../../features/auth/components/AuthContext';

const AssignmentPage = () => {
	const auth = useAuth()
	const { assignmentId } = useParams<{ assignmentId: string }>()
	const { assignment, fetching, error } = useAssignmentPageData(assignmentId || "")

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !assignment ? "Entity not found!" : null}
				{!fetching && !error && assignment && assignmentId ?
					<AssignmentCard assignmentId={assignmentId} mode={auth.userId === assignment.ownerId ? Mode.EDIT : Mode.VIEW}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default AssignmentPage;