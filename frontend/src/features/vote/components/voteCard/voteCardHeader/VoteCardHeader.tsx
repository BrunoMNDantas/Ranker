import React, { HTMLAttributes } from 'react';
import { Vote } from '../../../model/Vote.types';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import VoteAvatar from '../../voteAvatar/VoteAvatar';
import EntityProperty from '../../../../../components/entityProperty/EntityProperty';
import VoteBreadcrumbs from '../../voteBreadcrumbs/VoteBreadcrumbs';

export interface VoteCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
    showBreadcrumbs?: boolean
    showCreationDate?: boolean
}

const VoteCardHeader = ({ vote, showBreadcrumbs=true, showCreationDate=true, ...props }: VoteCardHeaderProps) => {
    const id = vote.id
    const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(vote.creationDate)

    return (
        <EntityCardHeader avatar={<VoteAvatar vote={vote}/>} {...props}>
            { showBreadcrumbs ? <VoteBreadcrumbs vote={vote}/> : null }
            <EntityProperty value={id} variant='h6'/>
            { showCreationDate ? <EntityProperty value={date} variant='caption'/> : null }
        </EntityCardHeader>
    )
}

export default VoteCardHeader;