import classes from './VotePage.module.css';
import { useParams } from 'react-router-dom';
import LoadElement from '../../components/loadElement/LoadElement';
import VoteCard from '../../features/vote/components/voteCard/VoteCard';
import { Mode } from '../../components/entityCard/EntityCard';
import { useVotePageData } from '../../features/vote/hooks/UseVotePage.hook';
import { useAuth } from '../../features/auth/components/AuthContext';

const VotePage = () => {
	const auth = useAuth()
	const { voteId } = useParams<{ voteId: string }>()
	const { vote, fetching, error } = useVotePageData(voteId || "")

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !vote ? "Entity not found!" : null}
				{!fetching && !error && vote && voteId ?
					<VoteCard voteId={voteId} mode={auth.userId === vote.ownerId ? Mode.EDIT : Mode.VIEW}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default VotePage;