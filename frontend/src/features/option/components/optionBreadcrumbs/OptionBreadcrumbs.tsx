import React from 'react';
import { appOptionRoute, appRankRoute, appUserRoute } from '../../../../app/Routes';
import RankIcon from '../../../rank/components/rankIcon/RankIcon';
import EntityBreadcrumbs from '../../../../components/entityBreadcrumbs/EntityBreadcrumbs';
import { BreadcrumbsProps } from '@mui/material';
import OptionIcon from '../optionIcon/OptionIcon';
import UserIcon from '../../../user/components/userIcon/UserIcon';
import { useAppSelector } from '../../../../app/hooks';
import { selectOptionById } from '../../store/Option.selectors';

export interface OptionBreadcrumbsProps extends BreadcrumbsProps {
    optionId: string
}

const OptionBreadcrumbs = ({ optionId, ...props }: OptionBreadcrumbsProps) => {
    const option = useAppSelector(state => selectOptionById(state, optionId))

    if(!option) {
        return null
    }

    const links=[
        {name: "Owner", href: appUserRoute(option.ownerId), Icon: UserIcon},
        {name: "Rank", href: appRankRoute(option.rankId), Icon: RankIcon},
        {name: "Option", href: appOptionRoute(option.id), Icon: OptionIcon}
    ]

    return <EntityBreadcrumbs links={links} {...props}/>
}

export default OptionBreadcrumbs;