import React, { HTMLAttributes } from 'react';
import { Vote } from '../../model/Vote.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import VoteCardHeader from './voteCardHeader/VoteCardHeader';
import VoteCardActions from './voteCardActions/VoteCardActions';
import VoteCardContent from './voteCardContent/VoteCardContent';
import { Mode } from '../../../../components/entityCard/EntityCard';

export interface VoteCardProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
    mode: Mode
    onVoteChange: (changedVote: Vote) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
}

const VoteCard = ({ vote, mode, onVoteChange, onClear, onSave, onDelete, ...props }: VoteCardProps) => {
    return (
        <EntityCard
            cardHeader={<VoteCardHeader vote={vote}/>}
            cardContent={<VoteCardContent vote={vote} onVoteChange={onVoteChange} mode={mode}/>}
            cardActions={<VoteCardActions onClear={onClear} onSave={onSave} onDelete={onDelete} mode={mode}/>}
            {...props}/>
    );
}

export default VoteCard;