import React, { HTMLAttributes } from 'react';
import { Vote } from '../../../model/Vote.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { TextField } from '@mui/material';

export interface VoteCardContentProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
    onVoteChange: (vote: Vote) => void
}

const VoteCardContent = ({ vote, onVoteChange, ...props }: VoteCardContentProps) => {
    const properties = [
        <TextField
            disabled
            label="ID"
            type="text"
            value={vote.id || ""}/>
    ]

    return <EntityCardContent properties={properties} {...props}/>
}

export default VoteCardContent;