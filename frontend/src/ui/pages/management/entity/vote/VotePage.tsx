import React, { useState, useCallback } from 'react';
import classes from './VotePage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import EntityPage from '../entityPage/EntityPage';
import { deleteVote, getVote, updateVote } from '../../../../../logic/api/Vote.api';
import { getAssignmentsOfVote } from '../../../../../logic/api/Assignment.api';
import { Vote } from '../../../../../logic/entities/Vote';
import { Assignment } from '../../../../../logic/entities/Assignment';
import TextField from '@mui/material/TextField';
import EntityForm from '../entityForm/EntityForm';
import { Button, List, ListItem, ListItemButton, ListItemText, Typography, Divider } from '@mui/material';
import { useExecute } from '../../../../../logic/hooks/UseExecute';
import LoadElement from '../../../../components/loadElement/LoadElement';

export interface VoteAssignmentsListProps {
	voteId: string | null
}

export const VoteAssignmentsList = ({ voteId }: VoteAssignmentsListProps) => {
	const navigate = useNavigate()
	const getAssignments = useCallback(() => voteId ? getAssignmentsOfVote(voteId) : Promise.resolve([]), [voteId])
	const { result: assignments, executing, error } = useExecute<Assignment[]>(getAssignments)

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
							<ListItemButton onClick={() => navigate(`/management/assignments/${assignment.id}`)}>
								<ListItemText primary={`Assignment ${assignment.id}`}/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</LoadElement>
		</div>
	)
}

export interface VotePropertiesProps {
	vote: Vote
}

export const VoteProperties = ({vote}: VotePropertiesProps) => {
	const navigate = useNavigate()

	return (
		<div className={classes.properties}>
			<div className={classes.rank}>
				<div>
					<strong>Rank ID:</strong> <span>{vote.rankId}</span>
				</div>
				<Button
					variant="outlined"
					size="small"
					onClick={() => navigate(`/management/ranks/${vote.rankId}`)}>
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
			navigate("/management/votes")
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
	const { voteId } = useParams<{ voteId: string }>();

	return (
		<EntityPage
			title="Vote Page"
			getEntity={() => voteId ? getVote(voteId) : Promise.resolve(null)}
			EntityForm={VoteForm}/>
	);
}

export default VotePage;