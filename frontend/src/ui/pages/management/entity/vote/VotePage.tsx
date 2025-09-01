import React, { useState } from 'react';
import classes from './VotePage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import EntityPage from '../entityPage/EntityPage';
import { deleteVote, getVote, updateVote } from '../../../../../logic/api/Vote.api';
import { Vote } from '../../../../../logic/entities/Vote';
import TextField from '@mui/material/TextField';
import EntityForm from '../entityForm/EntityForm';
import { Button } from '@mui/material';

export interface VotePropertiesProps {
	vote: Vote | null
}

export const VoteProperties = ({vote}: VotePropertiesProps) => {
	const navigate = useNavigate()

	return (
		<div className={classes.properties}>
			<div className={classes.rank}>
				<div>
					<strong>Rank ID:</strong> <span>{vote?.rankId}</span>
				</div>
				<Button
					variant="outlined"
					size="small"
					onClick={() => navigate(`/management/ranks/${vote?.rankId}`)}>
					Go to Rank
				</Button>
			</div>
			<TextField
				disabled={true}
				label="Id"
				type="text"
				value={vote?.id}/>
			<TextField
				disabled={true}
				label="Creation Date"
				type="text"
				value={vote?.creationDate?.toLocaleString()}/>
		</div>
	)
}

export interface VoteFormProps {
	entity: Vote | null
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
		if(vote?.id) {
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
			EntityComponent={VoteForm}/>
	);
}

export default VotePage;