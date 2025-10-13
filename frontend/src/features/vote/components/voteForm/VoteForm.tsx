import React, { HTMLAttributes } from 'react';
import { Vote } from '../../model/Vote.types';
import { Mode } from '../../../../components/entityCard/EntityCard';
import EntityCardForm from '../../../../components/entityCard/entityCardForm/EntityCardForm';

export interface VoteFormProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
    onVoteChange: (vote: Vote) => void
    mode: Mode
}

const VoteForm = ({ vote, onVoteChange, mode, ...props }: VoteFormProps) => {
    return <EntityCardForm {...props}/>
}

export default VoteForm;