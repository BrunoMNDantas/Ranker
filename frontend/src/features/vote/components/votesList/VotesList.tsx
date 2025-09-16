import React, { HTMLAttributes } from 'react';
import { Vote } from '../../model/Vote.types';
import VoteChip from '../voteChip/VoteChip';
import EntityList from '../../../../components/entityList/EntityList';

export interface VotesListProps extends HTMLAttributes<HTMLDivElement> {
    votes: Vote[]
    voteUrl?: (vote: Vote) => string
    onVoteClick?: (vote: Vote) => void
}

const VotesList = ({ votes, voteUrl, onVoteClick, ...props }: VotesListProps) => {
    return <EntityList
        entities={votes}
        entityRenderer={vote => <VoteChip vote={vote}/>}
        entityUrl={voteUrl}
        onEntityClick={onVoteClick}
        {...props}/>
}

export default VotesList;