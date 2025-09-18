import React, { useState, useEffect } from 'react';
import classes from './VotePage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteVote, updateVote } from '../../../../features/vote/api/Vote.api'
import { Vote } from '../../../../features/vote/model/Vote.types';
import { MANAGEMENT_VOTES_ROUTE } from '../../../../app/Routes';
import LoadElement from '../../../../components/loadElement/LoadElement';
import VoteCard from '../../../../features/vote/components/voteCard/VoteCard';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { useVote } from '../../../../features/vote/hooks/UseVote.hook';
import { useAssignmentsOfVote } from '../../../../features/assignment/hooks/UseAssignmentsOfVote.hook';

const VotePage = () => {
	const navigate = useNavigate()
	const { voteId } = useParams<{ voteId: string }>()
	const [editedVote, setEditedVote] = useState<Vote | null>(null)

	const { vote, fetching: fetchingVote, error: voteError } = useVote(voteId || "")
	const { assignments, fetching: fetchingAssignments, error: assignmentsError } = useAssignmentsOfVote(voteId ||"")

	const fetching = fetchingVote || fetchingAssignments
	const error = voteError || assignmentsError

	useEffect(() => {
		if(!editedVote) {
			setEditedVote(structuredClone(vote))
		}
	}, [editedVote, vote])

	const handleVoteChange = (changedVote: Vote) => {
		setEditedVote(changedVote)
	}

	const handleClear = () => {
		setEditedVote(structuredClone(vote))
		return Promise.resolve()
	}

	const handleSave = () => {
		if (editedVote) {
			return updateVote(editedVote)
		}
		return Promise.resolve()
	}

	const handleDelete = async () => {
		if (vote?.id) {
			await deleteVote(vote.id)
			navigate(MANAGEMENT_VOTES_ROUTE)
		}
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !vote ? "Entity not found!" : null}
				{!fetching && !error && editedVote ?
					<VoteCard
						vote={editedVote}
						assignments={assignments || []}
						mode={Mode.EDIT}
						onVoteChange={handleVoteChange}
						onClear={handleClear}
						onSave={handleSave}
						onDelete={handleDelete}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default VotePage;