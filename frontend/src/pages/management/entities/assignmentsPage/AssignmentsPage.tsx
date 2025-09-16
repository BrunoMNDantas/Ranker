import React from 'react';
import EntitiesPage from '../entitiesPage/EntitiesPage';
import { getAllAssignments } from '../../../../features/assignment/api/Assignment.api';
import { managementAssignmentRoute } from '../../../../app/Routes';
import AssignmentsList from '../../../../features/assignment/components/assignmentsList/AssignmentsList';

const AssignmentsPage = () => {
	return (
		<EntitiesPage
			title="Assignments Page"
			getEntities={getAllAssignments}
			entitiesRenderer={entities => (
				<AssignmentsList assignments={entities} assignmentUrl={assignment => managementAssignmentRoute(assignment.id!)}/>
			)}/>
	);
}

export default AssignmentsPage;