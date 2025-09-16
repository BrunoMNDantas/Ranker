import React from 'react';
import classes from './AssignmentsPage.module.css';
import { managementAssignmentRoute } from '../../../../app/Routes';
import AssignmentsList from '../../../../features/assignment/components/assignmentsList/AssignmentsList';
import { useAssignments } from '../../../../features/assignment/hooks/UseAssignments.hook';
import LoadElement from '../../../../components/loadElement/LoadElement';

const AssignmentsPage = () => {
	const {assignments, error, fetching} = useAssignments()

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				<AssignmentsList assignments={assignments || []} assignmentUrl={assignment => managementAssignmentRoute(assignment.id!)}/>
				{error ? error.toString() : null}
			</LoadElement>
		</div>
	)
}

export default AssignmentsPage;