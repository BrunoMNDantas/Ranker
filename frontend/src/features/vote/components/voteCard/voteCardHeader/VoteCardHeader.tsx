import React, { HTMLAttributes } from 'react';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import VoteAvatar from '../../voteAvatar/VoteAvatar';
import EntityProperty from '../../../../../components/entityProperty/EntityProperty';
import VoteBreadcrumbs from '../../voteBreadcrumbs/VoteBreadcrumbs';
import { useAppSelector } from '../../../../../app/hooks';
import { selectVoteById } from '../../../store/Vote.selectors';

export interface VoteCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    voteId: string
    showBreadcrumbs?: boolean
    showCreationDate?: boolean
}

const VoteCardHeader = ({ voteId, showBreadcrumbs=true, showCreationDate=true, ...props }: VoteCardHeaderProps) => {
    const vote = useAppSelector((state) => selectVoteById(state, voteId))

    if (!vote) {
        return null
    }

    const id = vote.id
    const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(vote.creationDate)

    return (
        <EntityCardHeader avatar={<VoteAvatar voteId={vote.id}/>} {...props}>
            { showBreadcrumbs ? <VoteBreadcrumbs voteId={vote.id}/> : null }
            <EntityProperty value={id} variant='h6'/>
            { showCreationDate ? <EntityProperty value={date} variant='caption'/> : null }
        </EntityCardHeader>
    )
}

export default VoteCardHeader;