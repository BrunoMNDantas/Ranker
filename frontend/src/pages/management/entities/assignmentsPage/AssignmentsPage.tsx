import React from 'react';
import EntitiesPage from '../entitiesPage/EntitiesPage';
import { getAllAssignments } from '../../../../features/assignment/api/Assignment.api';
import { managementAssignmentRoute } from '../../../../app/Routes';
import AssignmentList from '../../../../features/assignment/components/assignmentList/AssignmentList';

const AssignmentsPage = () => {
	return (
		<EntitiesPage
			title="Assignments Page"
			getEntities={getAllAssignments}
			entitiesRenderer={entities => (
				<AssignmentList assignments={entities} assignmentUrl={assignment => managementAssignmentRoute(assignment.id!)}/>
			)}/>
	);
}

export default AssignmentsPage;