import React, { HTMLAttributes } from 'react';
import { Vote } from '../../model/Vote.types';
import VoteChip from '../voteChip/VoteChip';
import EntityList from '../../../../components/entityList/EntityList';

export interface VoteListProps extends HTMLAttributes<HTMLDivElement> {
    votes: Vote[]
    voteUrl?: (vote: Vote) => string
    onVoteClick?: (vote: Vote) => void
}

const VoteList = ({ votes, voteUrl, onVoteClick, ...props }: VoteListProps) => {
    return <EntityList
        entities={votes}
        entityRenderer={vote => <VoteChip vote={vote}/>}
        entityUrl={voteUrl}
        onEntityClick={onVoteClick}
        {...props}/>
}

export default VoteList;