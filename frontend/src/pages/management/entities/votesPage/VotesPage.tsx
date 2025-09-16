import React from 'react';
import { getAllVotes } from '../../../../features/vote/api/Vote.api';
import EntitiesPage from '../entitiesPage/EntitiesPage';
import { managementVoteRoute } from '../../../../app/Routes';
import VotesList from '../../../../features/vote/components/votesList/VotesList';

const VotesPage = () => {
	return (
		<EntitiesPage
			title="Votes Page"
			getEntities={getAllVotes}
			entitiesRenderer={entities => (
				<VotesList votes={entities} voteUrl={vote => managementVoteRoute(vote.id!)}/>
			)}/>
	);
}

export default VotesPage;