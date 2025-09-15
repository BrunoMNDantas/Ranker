import React, { HTMLAttributes, useState } from 'react';
import { Tier } from '../../model/Tier.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import { deleteTier, updateTier } from '../../api/Tier.api';
import TierCardHeader from './tierCardHeader/TierCardHeader';
import TierCardActions from './tierCardActions/TierCardActions';
import TierCardContent from './tierCardContent/TierCardContent';
import { Mode } from '../../../../components/entityCard/EntityCard';

export interface TierCardProps extends HTMLAttributes<HTMLDivElement> {
    tier: Tier
    mode: Mode
}

const TierCard = ({ tier, mode, ...props }: TierCardProps) => {
    const [editedTier, setEditedTier] = useState(structuredClone(tier))

    const handleChange = (changedTier: Tier) => {
        setEditedTier(changedTier)
    }

    const handleClear = () => {
        setEditedTier(structuredClone(tier))
        return Promise.resolve()
    }

    const handleSave = () => {
        return updateTier(editedTier)
    }

    const handleDelete = () => {
        return deleteTier(tier.id!)
    }

    return (
        <EntityCard
            cardHeader={<TierCardHeader tier={editedTier}/>}
            cardContent={<TierCardContent tier={editedTier} onTierChange={handleChange} mode={mode}/>}
            cardActions={<TierCardActions onClear={handleClear} onSave={handleSave} onDelete={handleDelete} mode={mode}/>}
            {...props}/>
    );
}

export default TierCard;