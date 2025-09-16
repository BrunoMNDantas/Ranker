import React, { HTMLAttributes } from 'react';
import { Tier } from '../../model/Tier.types';
import TierChip from '../tierChip/TierChip';
import EntityList from '../../../../components/entityList/EntityList';

export interface TiersListProps extends HTMLAttributes<HTMLDivElement> {
    tiers: Tier[]
    tierUrl?: (tier: Tier) => string
    onTierClick?: (tier: Tier) => void
}

const TiersList = ({ tiers, tierUrl, onTierClick, ...props }: TiersListProps) => {
    return <EntityList
        entities={tiers}
        entityRenderer={tier => <TierChip tier={tier}/>}
        entityUrl={tierUrl}
        onEntityClick={onTierClick}
        {...props}/>
}

export default TiersList;