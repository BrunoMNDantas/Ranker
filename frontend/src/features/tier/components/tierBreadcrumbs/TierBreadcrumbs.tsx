import React from 'react';
import { appRankRoute, appTierRoute, appUserRoute } from '../../../../app/Routes';
import RankIcon from '../../../rank/components/rankIcon/RankIcon';
import EntityBreadcrumbs from '../../../../components/entityBreadcrumbs/EntityBreadcrumbs';
import { BreadcrumbsProps } from '@mui/material';
import { Tier } from '../../model/Tier.types';
import TierIcon from '../tierIcon/TierIcon';
import UserIcon from '../../../user/components/userIcon/UserIcon';

export interface TierBreadcrumbsProps extends BreadcrumbsProps {
    tier: Tier
}

const TierBreadcrumbs = ({ tier, ...props }: TierBreadcrumbsProps) => {
    const links=[
        {name: "Owner", href: appUserRoute(tier.ownerId), Icon: UserIcon},
        {name: "Rank", href: appRankRoute(tier.rankId), Icon: RankIcon},
        {name: "Tier", href: appTierRoute(tier.id), Icon: TierIcon}
    ]

    return <EntityBreadcrumbs links={links} {...props}/>
}

export default TierBreadcrumbs;