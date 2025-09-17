import React from 'react';
import { appRankRoute } from '../../../../app/Routes';
import RankIcon from '../rankIcon/RankIcon';
import EntityBreadcrumbs from '../../../../components/entityBreadcrumbs/EntityBreadcrumbs';
import { BreadcrumbsProps } from '@mui/material';
import { Rank } from '../../model/Rank.types';

export interface RankBreadcrumbsProps extends BreadcrumbsProps {
    rank: Rank
}

const RankBreadcrumbs = ({ rank, ...props }: RankBreadcrumbsProps) => {
    const links=[
        {name: "Rank", href: appRankRoute(rank.id!), Icon: RankIcon}
    ]

    return <EntityBreadcrumbs links={links} {...props}/>
}

export default RankBreadcrumbs;