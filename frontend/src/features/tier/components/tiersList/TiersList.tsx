import React, { HTMLAttributes, ReactNode } from 'react';
import { Tier } from '../../model/Tier.types';
import TierChip from '../tierChip/TierChip';
import EntityList from '../../../../components/entityList/EntityList';

export interface TiersListProps extends HTMLAttributes<HTMLDivElement> {
    tiers: Tier[]
    tierUrl?: (tier: Tier) => string
    onTierClick?: (tier: Tier) => void
    chipActions?: (tier: Tier) => ReactNode[]
}

const TiersList = ({ tiers, tierUrl, onTierClick, chipActions=()=>[], ...props }: TiersListProps) => {
    return (
        <EntityList
            entities={tiers}
            entityRenderer={tier => <TierChip tier={tier}>{chipActions(tier)}</TierChip>}
            entityUrl={tierUrl}
            onEntityClick={onTierClick}
            {...props}/>
    )
}

export default TiersList;