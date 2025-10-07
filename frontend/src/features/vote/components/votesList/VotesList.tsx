import React, { HTMLAttributes, ReactNode } from 'react';
import { Vote } from '../../model/Vote.types';
import VoteChip from '../voteChip/VoteChip';
import EntityList from '../../../../components/entityList/EntityList';

export interface VotesListProps extends HTMLAttributes<HTMLDivElement> {
    votes: Vote[]
    voteUrl?: (vote: Vote) => string
    onVoteClick?: (vote: Vote) => void
    chipActions?: (vote: Vote) => ReactNode[]
}

const VotesList = ({ votes, voteUrl, onVoteClick, chipActions=()=>[], ...props }: VotesListProps) => {
    return (
        <EntityList
            entities={votes}
            entityRenderer={vote => <VoteChip voteId={vote.id}>{chipActions(vote)}</VoteChip>}
            entityUrl={voteUrl}
            onEntityClick={onVoteClick}
            {...props}/>
    )
}

export default VotesList;