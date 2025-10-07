import React, { HTMLAttributes } from 'react';
import EntityChip from '../../../../components/entityChip/EntityChip';
import VoteAvatar from '../voteAvatar/VoteAvatar';
import { useAppSelector } from '../../../../app/hooks';
import { selectVoteById } from '../../store/Vote.selectors';

export interface VoteChipProps extends HTMLAttributes<HTMLDivElement> {
    voteId: string
}

const VoteChip = ({ voteId, children, ...props }: VoteChipProps) => {
    const vote = useAppSelector(state => selectVoteById(state, voteId))

    if(!vote) {
        return null
    }

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