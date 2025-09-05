import React, { HTMLAttributes } from 'react';
import { Tier } from '../../model/Tier.types';
import TierChip from '../tierChip/TierChip';
import EntityList from '../../../../components/entityList/EntityList';

export interface TierListProps extends HTMLAttributes<HTMLDivElement> {
    tiers: Tier[]
    tierUrl?: (tier: Tier) => string
    onTierClick?: (tier: Tier) => void
}

const TierList = ({ tiers, tierUrl, onTierClick, ...props }: TierListProps) => {
    return <EntityList
        entities={tiers}
        entityRenderer={tier => <TierChip tier={tier}/>}
        entityUrl={tierUrl}
        onEntityClick={onTierClick}
        {...props}/>
}

export default TierList;