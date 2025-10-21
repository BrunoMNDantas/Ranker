import { HTMLAttributes, ReactNode } from 'react';
import { Tier } from '../../model/Tier.types';
import TierChip from '../tierChip/TierChip';
import EntityList from '../../../../components/entityList/EntityList';
import { useAppSelector } from '../../../../app/hooks';
import { selectTiersByIds } from '../../store/Tier.selectors';

export interface TiersListProps extends HTMLAttributes<HTMLDivElement> {
    tierIds: string[]
    tierUrl?: (tier: Tier) => string
    onTierClick?: (tier: Tier) => void
    chipActions?: (tier: Tier) => ReactNode[]
}

const TiersList = ({ tierIds, tierUrl, onTierClick, chipActions=()=>[], ...props }: TiersListProps) => {
    const tiers = useAppSelector(state => selectTiersByIds(state, tierIds))

    return (
        <EntityList
            entities={tiers}
            entityRenderer={tier => <TierChip tierId={tier.id}>{chipActions(tier)}</TierChip>}
            entityUrl={tierUrl}
            onEntityClick={onTierClick}
            entityType="tier"
            {...props}/>
    )
}

export default TiersList;