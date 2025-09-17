import React, { HTMLAttributes } from 'react';
import { Vote } from '../../../model/Vote.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { TextField } from '@mui/material';
import { Mode } from '../../../../../components/entityCard/EntityCard';

export interface VoteCardContentProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
    onVoteChange: (vote: Vote) => void
    mode: Mode
}

const VoteCardContent = ({ vote, onVoteChange, mode, ...props }: VoteCardContentProps) => {
    return <EntityCardContent properties={[]} {...props}/>
}

export default VoteCardContent;