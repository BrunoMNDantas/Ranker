import React from 'react';
import { getAllVotes } from '../../../../../logic/api/Vote.api';
import EntitiesPage from '../entitiesPage/EntitiesPage';
import { managementVoteRoute } from '../../../../../Routes';

const VotesPage = () => {
	return (
		<EntitiesPage
			title="Votes Page"
			getEntityUrl={vote => managementVoteRoute(vote.id!)}
			getEntities={getAllVotes}
			entityRenderer={vote => <div>{ vote.id }</div>}/>
	);
}

export default VotesPage;