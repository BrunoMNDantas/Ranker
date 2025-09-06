import React, { HTMLAttributes, useState } from 'react';
import { Vote } from '../../model/Vote.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import { deleteVote, updateVote } from '../../api/Vote.api';
import VoteCardHeader from './voteCardHeader/VoteCardHeader';
import VoteCardActions from './voteCardActions/VoteCardActions';
import VoteCardContent from './voteCardContent/VoteCardContent';

export interface VoteCardProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
}

const VoteCard = ({ vote, ...props }: VoteCardProps) => {
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
            cardContent={<VoteCardContent vote={editedVote} onVoteChange={handleChange}/>}
            cardActions={<VoteCardActions vote={editedVote} onClear={handleClear} onSave={handleSave} onDelete={handleDelete}/>}
            {...props}/>
    );
}

export default VoteCard;