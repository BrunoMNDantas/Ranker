import React from 'react';
import { appRankRoute, appUserRoute } from '../../../../app/Routes';
import RankIcon from '../rankIcon/RankIcon';
import EntityBreadcrumbs from '../../../../components/entityBreadcrumbs/EntityBreadcrumbs';
import { BreadcrumbsProps } from '@mui/material';
import { Rank } from '../../model/Rank.types';
import UserIcon from '../../../user/components/userIcon/UserIcon';

export interface RankBreadcrumbsProps extends BreadcrumbsProps {
    rank: Rank
}

const RankBreadcrumbs = ({ rank, ...props }: RankBreadcrumbsProps) => {
    const links=[
        {name: "Owner", href: appUserRoute(rank.ownerId), Icon: UserIcon},
        {name: "Rank", href: appRankRoute(rank.id), Icon: RankIcon}
    ]

    return <EntityBreadcrumbs links={links} {...props}/>
}

export default RankBreadcrumbs;