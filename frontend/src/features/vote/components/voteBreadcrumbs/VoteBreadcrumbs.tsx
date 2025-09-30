import React from 'react';
import { Vote } from '../../model/Vote.types';
import { appRankRoute, appUserRoute, appVoteRoute } from '../../../../app/Routes';
import RankIcon from '../../../rank/components/rankIcon/RankIcon';
import EntityBreadcrumbs from '../../../../components/entityBreadcrumbs/EntityBreadcrumbs';
import VoteIcon from '../voteIcon/VoteIcon';
import { BreadcrumbsProps } from '@mui/material';
import UserIcon from '../../../user/components/userIcon/UserIcon';

export interface VoteBreadcrumbsProps extends BreadcrumbsProps {
    vote: Vote
}

const VoteBreadcrumbs = ({ vote, ...props }: VoteBreadcrumbsProps) => {
    const links=[
        {name: "Owner", href: appUserRoute(vote.ownerId), Icon: UserIcon},
        {name: "Rank", href: appRankRoute(vote.rankId), Icon: RankIcon},
        {name: "Vote", href: appVoteRoute(vote.id), Icon: VoteIcon}
    ]

    return <EntityBreadcrumbs links={links} {...props}/>
}

export default VoteBreadcrumbs;