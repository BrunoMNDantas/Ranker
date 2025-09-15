import React, { useState, useCallback, useEffect } from 'react';
import classes from './VotePage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteVote, getVote, updateVote } from '../../../../features/vote/api/Vote.api'
import { getAssignmentsOfVote, createAssignment } from '../../../../features/assignment/api/Assignment.api';
import { Vote } from '../../../../features/vote/model/Vote.types';
import { Assignment } from '../../../../features/assignment/model/Assignment.types';
import { Button, Typography, Divider } from '@mui/material';
import { useExecute } from '../../../../hooks/UseExecute';
import { createAssignment as createNewAssignment } from '../../../../services/EntityFactory.service';
import { MANAGEMENT_VOTES_ROUTE, managementAssignmentRoute } from '../../../../app/Routes';
import LoadElement from '../../../../components/loadElement/LoadElement';
import VoteCard from '../../../../features/vote/components/voteCard/VoteCard';
import { Mode } from '../../../../components/entityCard/EntityCard';
import AssignmentList from '../../../../features/assignment/components/assignmentList/AssignmentList';

export interface VoteAssignmentsListProps {
	voteId: string | null
}

export const VoteAssignmentsList = ({ voteId }: VoteAssignmentsListProps) => {
	const navigate = useNavigate()
	const getAssignments = useCallback(() => voteId ? getAssignmentsOfVote(voteId) : Promise.resolve([]), [voteId])
	const { result: assignments, executing, error } = useExecute<Assignment[]>(getAssignments)

	const handleCreateAssignment = async () => {
		if (voteId) {
			const newAssignment = createNewAssignment({ voteId })
			const createdId = await createAssignment(newAssignment)
			navigate(managementAssignmentRoute(createdId))
		}
	}

	return (
		<div className={classes.assignmentsContainer}>
			<Typography variant="h6" gutterBottom>
				Assignments:
			</Typography>
			<Divider />
			<LoadElement loading={executing}>
				{error ? <Typography color="error">Error loading assignments: {error.message}</Typography> : null}
				{assignments ? <AssignmentList assignments={assignments} assignmentUrl={assignment => managementAssignmentRoute(assignment.id!)} /> : null}
				<Button
					variant="contained"
					size="small"
					onClick={handleCreateAssignment}
					className={classes.createButton}>
					Create Assignment
				</Button>
			</LoadElement>
		</div>
	)
}

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
			navigate(MANAGEMENT_VOTES_ROUTE)
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
			<div className={classes.relatedContainers}>
				{voteId  ? <div className={classes.relatedContainer}><VoteAssignmentsList voteId={voteId}/></div> : null}
			</div>
		</div>
	);
}

export default VotePage;