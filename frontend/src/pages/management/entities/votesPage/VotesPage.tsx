import React from 'react';
import { getAllVotes } from '../../../../features/vote/api/Vote.api';
import EntitiesPage from '../entitiesPage/EntitiesPage';
import { managementVoteRoute } from '../../../../app/Routes';
import VoteList from '../../../../features/vote/components/voteList/VoteList';

const VotesPage = () => {
	return (
		<EntitiesPage
			title="Votes Page"
			getEntities={getAllVotes}
			entitiesRenderer={entities => (
				<VoteList votes={entities} voteUrl={vote => managementVoteRoute(vote.id!)}/>
			)}/>
	);
}

export default VotesPage;