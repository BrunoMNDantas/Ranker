import React from 'react';
import EntitiesPage from '../entitiesPage/EntitiesPage';
import { getAllAssignments } from '../../../../features/assignment/api/Assignment.api';
import { managementAssignmentRoute } from '../../../../app/Routes';

const AssignmentsPage = () => {
	return (
		<EntitiesPage
			title="Assignments Page"
			getEntityUrl={assignment => managementAssignmentRoute(assignment.id!)}
			getEntities={getAllAssignments}
			entityRenderer={assignment => <div>{ assignment.id }</div>}/>
	);
}

export default AssignmentsPage;