import React, { useState, useCallback, useEffect } from 'react';
import classes from './VotePage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteVote, getVote, updateVote } from '../../features/vote/api/Vote.api';
import { useExecute } from '../../hooks/UseExecute';
import { Vote } from '../../features/vote/model/Vote.types';
import { APP_VOTES_ROUTE } from '../../app/Routes';
import LoadElement from '../../components/loadElement/LoadElement';
import VoteCard from '../../features/vote/components/voteCard/VoteCard';
import { Mode } from '../../components/entityCard/EntityCard';

const VotePage = () => {
	const navigate = useNavigate()
	const { voteId } = useParams<{ voteId: string }>()
	const getVoteCallback = useCallback(() => voteId ? getVote(voteId) : Promise.resolve(null), [voteId])
	const { result: vote, executing, error } = useExecute(getVoteCallback)
	const [editedVote, setEditedVote] = useState<Vote | null>(null)

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
			navigate(APP_VOTES_ROUTE)
		}
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={executing}>
				{!executing && error ? error.toString() : null}
				{!executing && !error && !vote ? "Entity not found!" : null}
				{!executing && !error && editedVote ?
					<VoteCard
						vote={editedVote}
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