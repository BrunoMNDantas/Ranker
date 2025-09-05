import React, { HTMLAttributes } from 'react';
import { Vote } from '../../model/Vote.types';
import EntityChip from '../../../../components/entityChip/EntityChip';
import VoteAvatar from '../voteAvatar/VoteAvatar';

export interface VoteChipProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
}

const VoteChip = ({ vote, ...props }: VoteChipProps) => {
    const name = vote.id
    const description = vote.creationDate ? new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(vote.creationDate) : null

    return (
        <EntityChip name={name} description={description} {...props}>
            <VoteAvatar vote={vote}/>
        </EntityChip>
    );
}

export default VoteChip;