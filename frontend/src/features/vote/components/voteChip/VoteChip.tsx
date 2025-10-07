import React, { HTMLAttributes } from 'react';
import { Vote } from '../../model/Vote.types';
import EntityChip from '../../../../components/entityChip/EntityChip';
import VoteAvatar from '../voteAvatar/VoteAvatar';

export interface VoteChipProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
}

const VoteChip = ({ vote, children, ...props }: VoteChipProps) => {
    const name = vote.id
    const description = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(vote.creationDate)

    return (
        <EntityChip
            name={name}
            description={description}
            avatar={<VoteAvatar voteId={vote.id}/>}
            {...props}>
            {children}
        </EntityChip>
    );
}

export default VoteChip;