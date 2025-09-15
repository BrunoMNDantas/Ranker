import React, { useState, useCallback } from 'react';
import classes from './VotePage.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EntityPage from '../entityPage/EntityPage';
import { deleteVote, getVote, updateVote } from '../../../../features/vote/api/Vote.api'
import { getAssignmentsOfVote, createAssignment } from '../../../../features/assignment/api/Assignment.api';
import { Vote } from '../../../../features/vote/model/Vote.types';
import { Assignment } from '../../../../features/assignment/model/Assignment.types';
import TextField from '@mui/material/TextField';
import EntityForm from '../entityForm/EntityForm';
import { Button, List, ListItem, ListItemButton, ListItemText, Typography, Divider } from '@mui/material';
import { useExecute } from '../../../../hooks/UseExecute';
import { createAssignment as createNewAssignment } from '../../../../services/EntityFactory.service';
import { MANAGEMENT_VOTES_ROUTE, managementAssignmentRoute, managementRankRoute } from '../../../../app/Routes';
import LoadElement from '../../../../components/loadElement/LoadElement';
import VoteCard from '../../../../features/vote/components/voteCard/VoteCard';
import { Mode } from '../../../../components/entityCard/EntityCard';

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
				<List>
					{assignments?.map((assignment) => (
						<ListItem
							key={assignment.id}
							disablePadding
							className={classes.assignmentItem}>
							<ListItemButton component={Link} to={managementAssignmentRoute(assignment.id!)}>
								<ListItemText primary={`Assignment ${assignment.id}`}/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
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

export interface VotePropertiesProps {
	vote: Vote
}

export const VoteProperties = ({vote}: VotePropertiesProps) => {
	return (
		<div className={classes.properties}>
			<div className={classes.rank}>
				<div>
					<strong>Rank ID:</strong> <span>{vote.rankId}</span>
				</div>
				<Button
					variant="contained"
					size="small"
					component={Link}
					to={managementRankRoute(vote.rankId!)}>
					Go to Rank
				</Button>
			</div>
			<TextField
				disabled={true}
				label="Id"
				type="text"
				value={vote.id}/>
			<TextField
				disabled={true}
				label="Creation Date"
				type="text"
				value={vote.creationDate?.toLocaleString()}/>
			<VoteAssignmentsList voteId={vote.id} />
		</div>
	)
}

export interface VoteFormProps {
	entity: Vote
}

export const VoteForm = ({entity: vote}: VoteFormProps) => {
	const navigate = useNavigate()
	const [editedVote, setEditedVote] = useState(vote)

	const handleClear = () => {
		setEditedVote(structuredClone(vote))
	}

	const handleSave = () => {
		if(editedVote) {
			updateVote(editedVote)
		}
	}

	const handleDelete = async () => {
		if(vote.id) {
			await deleteVote(vote.id)
			navigate(MANAGEMENT_VOTES_ROUTE)
		}
	}

	return (
		<EntityForm
			entity={editedVote}
			onClear={handleClear}
			onSave={handleSave}
			onDelete={handleDelete}>
			<VoteProperties vote={editedVote}/>
		</EntityForm>
	)
}

const VotePage = () => {
	const navigate = useNavigate()
	const { voteId } = useParams<{ voteId: string }>();
	const [vote, setVote] = useState<Vote | null>(null)
	const [editedVote, setEditedVote] = useState<Vote | null>(null)

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
		<EntityPage
			title="Vote Page"
			getEntity={async () => {
				if(voteId) {
					const vote = await getVote(voteId)
					setVote(structuredClone(vote))
					setEditedVote(structuredClone(vote))
					return vote
				}

				return Promise.resolve(null)
			}}
			entityRenderer={vote => (
				editedVote ?
					<VoteCard
						vote={editedVote}
						mode={Mode.VIEW}
						onVoteChange={handleVoteChange}
						onClear={handleClear}
						onSave={handleSave}
						onDelete={handleDelete}/> :
					null
			)}/>
	);
}

export default VotePage;