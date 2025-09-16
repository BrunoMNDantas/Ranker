import React from 'react';
import classes from './VotesPage.module.css';
import { managementVoteRoute } from '../../../../app/Routes';
import VotesList from '../../../../features/vote/components/votesList/VotesList';
import { useVotes } from '../../../../features/vote/hooks/UseVotes.hook';
import LoadElement from '../../../../components/loadElement/LoadElement';

const VotesPage = () => {
	const {votes, error, fetching} = useVotes()

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				<VotesList votes={votes || []} voteUrl={vote => managementVoteRoute(vote.id!)}/>
				{error ? error.toString() : null}
			</LoadElement>
		</div>
	)
}

export default VotesPage;