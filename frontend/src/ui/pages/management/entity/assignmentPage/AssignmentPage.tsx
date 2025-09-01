import React from 'react';
import { useParams } from 'react-router-dom';
import EntityPage from '../entityPage/EntityPage';
import { getAssignment } from '../../../../../logic/api/Assignment.api';

const AssignmentPage = () => {
	const { assignmentId } = useParams<{ assignmentId: string }>();

	return (
		<EntityPage
			title="Assignment Page"
			getEntity={() => getAssignment(assignmentId || "")}
			EntityComponent={({entity}) => <p>{entity?.id || "NOT FOUND"}</p>}/>
	);
}

export default AssignmentPage;