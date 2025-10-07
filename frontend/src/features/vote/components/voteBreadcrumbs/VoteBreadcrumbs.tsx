import React from 'react';
import { appRankRoute, appUserRoute, appVoteRoute } from '../../../../app/Routes';
import RankIcon from '../../../rank/components/rankIcon/RankIcon';
import EntityBreadcrumbs from '../../../../components/entityBreadcrumbs/EntityBreadcrumbs';
import VoteIcon from '../voteIcon/VoteIcon';
import { BreadcrumbsProps } from '@mui/material';
import UserIcon from '../../../user/components/userIcon/UserIcon';
import { useAppSelector } from '../../../../app/hooks';
import { selectVoteById } from '../../store/Vote.selectors';

export interface VoteBreadcrumbsProps extends BreadcrumbsProps {
    voteId: string
}

const VoteBreadcrumbs = ({ voteId, ...props }: VoteBreadcrumbsProps) => {
    const vote = useAppSelector(state => selectVoteById(state, voteId))

    if(!vote) {
        return null
    }

    const links=[
        {name: "Owner", href: appUserRoute(vote.ownerId), Icon: UserIcon},
        {name: "Rank", href: appRankRoute(vote.rankId), Icon: RankIcon},
        {name: "Vote", href: appVoteRoute(vote.id), Icon: VoteIcon}
    ]

    return <EntityBreadcrumbs links={links} {...props}/>
}

export default VoteBreadcrumbs;