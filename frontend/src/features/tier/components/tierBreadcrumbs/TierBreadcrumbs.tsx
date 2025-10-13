import { appRankRoute, appTierRoute, appUserRoute } from '../../../../app/Routes';
import RankIcon from '../../../rank/components/rankIcon/RankIcon';
import EntityBreadcrumbs from '../../../../components/entityBreadcrumbs/EntityBreadcrumbs';
import { BreadcrumbsProps } from '@mui/material';
import TierIcon from '../tierIcon/TierIcon';
import UserIcon from '../../../user/components/userIcon/UserIcon';
import { useAppSelector } from '../../../../app/hooks';
import { selectTierById } from '../../store/Tier.selectors';

export interface TierBreadcrumbsProps extends BreadcrumbsProps {
    tierId: string
}

const TierBreadcrumbs = ({ tierId, ...props }: TierBreadcrumbsProps) => {
    const tier = useAppSelector(state => selectTierById(state, tierId))

    if(!tier) {
        return null
    }

    const links=[
        {name: "Owner", href: appUserRoute(tier.ownerId), Icon: UserIcon},
        {name: "Rank", href: appRankRoute(tier.rankId), Icon: RankIcon},
        {name: "Tier", href: appTierRoute(tier.id), Icon: TierIcon}
    ]

    return <EntityBreadcrumbs links={links} {...props}/>
}

export default TierBreadcrumbs;