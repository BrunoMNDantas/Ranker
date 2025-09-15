import React, { HTMLAttributes } from 'react';
import { Tier } from '../../model/Tier.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import TierCardHeader from './tierCardHeader/TierCardHeader';
import TierCardActions from './tierCardActions/TierCardActions';
import TierCardContent from './tierCardContent/TierCardContent';
import { Mode } from '../../../../components/entityCard/EntityCard';

export interface TierCardProps extends HTMLAttributes<HTMLDivElement> {
    tier: Tier
    mode: Mode
    onTierChange: (changedTier: Tier) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
}

const TierCard = ({ tier, mode, onTierChange, onClear, onSave, onDelete, ...props }: TierCardProps) => {
    return (
        <EntityCard
            cardHeader={<TierCardHeader tier={tier}/>}
            cardContent={<TierCardContent tier={tier} onTierChange={onTierChange} mode={mode}/>}
            cardActions={<TierCardActions onClear={onClear} onSave={onSave} onDelete={onDelete} mode={mode}/>}
            {...props}/>
    );
}

export default TierCard;