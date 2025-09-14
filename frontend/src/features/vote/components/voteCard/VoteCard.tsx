import React, { HTMLAttributes, useState } from 'react';
import { Vote } from '../../model/Vote.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import { deleteVote, updateVote } from '../../api/Vote.api';
import VoteCardHeader from './voteCardHeader/VoteCardHeader';
import VoteCardActions from './voteCardActions/VoteCardActions';
import VoteCardContent from './voteCardContent/VoteCardContent';
import { Mode } from '../../../../components/entityCard/EntityCard';

export interface VoteCardProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
    mode: Mode
}

const VoteCard = ({ vote, mode, ...props }: VoteCardProps) => {
    const [editedVote, setEditedVote] = useState(structuredClone(vote))

    const handleChange = (changedVote: Vote) => {
        setEditedVote(changedVote)
    }

    const handleClear = () => {
        setEditedVote(structuredClone(vote))
        return Promise.resolve()
    }

    const handleSave = () => {
        return updateVote(editedVote)
    }

    const handleDelete = () => {
        return deleteVote(vote.id!)
    }

    return (
        <EntityCard
            cardHeader={<VoteCardHeader vote={editedVote}/>}
            cardContent={<VoteCardContent vote={editedVote} onVoteChange={handleChange} mode={mode}/>}
            cardActions={<VoteCardActions vote={editedVote} onClear={handleClear} onSave={handleSave} onDelete={handleDelete} mode={mode}/>}
            {...props}/>
    );
}

export default VoteCard;