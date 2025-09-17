import React from 'react';
import { appOptionRoute, appRankRoute } from '../../../../app/Routes';
import RankIcon from '../../../rank/components/rankIcon/RankIcon';
import EntityBreadcrumbs from '../../../../components/entityBreadcrumbs/EntityBreadcrumbs';
import { BreadcrumbsProps } from '@mui/material';
import { Option } from '../../model/Option.types';
import OptionIcon from '../optionIcon/OptionIcon';

export interface OptionBreadcrumbsProps extends BreadcrumbsProps {
    option: Option
}

const OptionBreadcrumbs = ({ option, ...props }: OptionBreadcrumbsProps) => {
    const links=[
        {name: "Rank", href: appRankRoute(option.rankId!), Icon: RankIcon},
        {name: "Option", href: appOptionRoute(option.id!), Icon: OptionIcon}
    ]

    return <EntityBreadcrumbs links={links} {...props}/>
}

export default OptionBreadcrumbs;