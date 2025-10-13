import { appRankRoute, appUserRoute } from '../../../../app/Routes';
import RankIcon from '../rankIcon/RankIcon';
import EntityBreadcrumbs from '../../../../components/entityBreadcrumbs/EntityBreadcrumbs';
import { BreadcrumbsProps } from '@mui/material';
import UserIcon from '../../../user/components/userIcon/UserIcon';
import { useAppSelector } from '../../../../app/hooks';
import { selectRankById } from '../../store/Rank.selectors';

export interface RankBreadcrumbsProps extends BreadcrumbsProps {
    rankId: string
}

const RankBreadcrumbs = ({ rankId, ...props }: RankBreadcrumbsProps) => {
    const rank = useAppSelector(state => selectRankById(state, rankId))

    if(!rank) {
        return null
    }

    const links=[
        {name: "Owner", href: appUserRoute(rank.ownerId), Icon: UserIcon},
        {name: "Rank", href: appRankRoute(rank.id), Icon: RankIcon}
    ]

    return <EntityBreadcrumbs links={links} {...props}/>
}

export default RankBreadcrumbs;