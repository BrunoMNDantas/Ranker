import React from 'react';
import { useParams } from 'react-router-dom';
import EntityPage from '../entityPage/EntityPage';
import { getVote } from '../../../../../logic/api/Vote.api';

const VotePage = () => {
	const { voteId } = useParams<{ voteId: string }>();

	return (
		<EntityPage
			title="Vote Page"
			getEntity={() => getVote(voteId || "")}
			EntityComponent={({entity}) => <p>{entity?.id || "NOT FOUND"}</p>}/>
	);
}

export default VotePage;