import React, { HTMLAttributes } from 'react';
import { Vote } from '../../../model/Vote.types';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import EntityCardForm from '../../../../../components/entityCard/entityCardForm/EntityCardForm';

export interface VoteCardFormProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
    onVoteChange: (vote: Vote) => void
    mode: Mode
}

const VoteCardForm = ({ vote, onVoteChange, mode, ...props }: VoteCardFormProps) => {
    return <EntityCardForm properties={[]} {...props}/>
}

export default VoteCardForm;