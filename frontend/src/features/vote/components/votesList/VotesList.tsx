import React, { HTMLAttributes, ReactNode } from 'react';
import { Vote } from '../../model/Vote.types';
import VoteChip from '../voteChip/VoteChip';
import EntityList from '../../../../components/entityList/EntityList';
import { useAppSelector } from '../../../../app/hooks';
import { selectVotesByIds } from '../../store/Vote.selectors';

export interface VotesListProps extends HTMLAttributes<HTMLDivElement> {
    voteIds: string[]
    voteUrl?: (vote: Vote) => string
    onVoteClick?: (vote: Vote) => void
    chipActions?: (vote: Vote) => ReactNode[]
}

const VotesList = ({ voteIds, voteUrl, onVoteClick, chipActions=()=>[], ...props }: VotesListProps) => {
    const votes = useAppSelector(state => selectVotesByIds(state, voteIds))

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