import React, { useState, useEffect } from 'react';
import classes from './VotePage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Vote } from '../../features/vote/model/Vote.types';
import { APP_VOTES_ROUTE } from '../../app/Routes';
import LoadElement from '../../components/loadElement/LoadElement';
import VoteCard from '../../features/vote/components/voteCard/VoteCard';
import { Mode } from '../../components/entityCard/EntityCard';
import { useVotePageData } from '../../features/vote/hooks/UseVotePage.hook';
import { Assignment } from '../../features/assignment/model/Assignment.types';
import { useAuth } from '../../features/auth/components/AuthContext';
import { deleteAssignmentThunk } from '../../features/assignment/store/Assignment.thunks';
import { updateVoteThunk, deleteVoteThunk } from '../../features/vote/store/Vote.thunks';
import { useAppDispatch } from '../../app/hooks';

const VotePage = () => {
	const navigate = useNavigate()
	const auth = useAuth()
	const dispatch = useAppDispatch()
	const { voteId } = useParams<{ voteId: string }>()
	const [editedVote, setEditedVote] = useState<Vote | null>(null)

	const { vote, assignments, fetching, error } = useVotePageData(voteId || "")

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

	const handleSave = async () => {
		if (editedVote) {
			await dispatch(updateVoteThunk(editedVote)).unwrap()
		}
	}

	const handleDelete = async () => {
		if (vote) {
			await dispatch(deleteVoteThunk(vote.id)).unwrap()
			navigate(APP_VOTES_ROUTE)
		}
	}

	const handleDeleteAssignment = async (assignment: Assignment) => {
		await dispatch(deleteAssignmentThunk(assignment.id)).unwrap()
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !vote ? "Entity not found!" : null}
				{!fetching && !error && editedVote ?
					<VoteCard
						vote={editedVote}
						assignments={assignments}
						mode={auth.userId === editedVote.ownerId ? Mode.EDIT : Mode.VIEW}
						onVoteChange={handleVoteChange}
						onClear={handleClear}
						onSave={handleSave}
						onDelete={handleDelete}
						onDeleteAssignment={handleDeleteAssignment}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default VotePage;