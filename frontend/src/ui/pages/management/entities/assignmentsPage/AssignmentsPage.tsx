import React from 'react';
import EntitiesPage from '../entitiesPage/EntitiesPage';
import { getAllAssignments } from '../../../../../logic/api/Assignment.api';

const AssignmentsPage = () => {
	return (
		<EntitiesPage
			title="Assignments Page"
			getEntityUrl={assignment => "/management/assignment/" + assignment.id}
			getEntities={getAllAssignments}
			entityRenderer={assignment => <div>{ assignment.id }</div>}/>
	);
}

export default AssignmentsPage;