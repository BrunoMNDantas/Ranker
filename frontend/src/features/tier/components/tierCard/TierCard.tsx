import React, { HTMLAttributes } from 'react';
import { Tier } from '../../model/Tier.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import TierCardHeader from './tierCardHeader/TierCardHeader';
import TierCardActions from './tierCardActions/TierCardActions';
import TierCardContent from './tierCardContent/TierCardContent';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { Assignment } from '../../../assignment/model/Assignment.types';

export interface TierCardProps extends HTMLAttributes<HTMLDivElement> {
    tier: Tier
    assignments: Assignment[]
    mode: Mode
    onTierChange: (changedTier: Tier) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
    onDeleteAssignment: (assignment: Assignment) => Promise<void>
}

const TierCard = ({ tier, assignments, mode, onTierChange, onClear, onSave, onDelete, onDeleteAssignment, ...props }: TierCardProps) => {
    const cardHeader = <TierCardHeader tier={tier}/>
    const cardContent = (
        <TierCardContent
            tier={tier} assignments={assignments} mode={mode}
            onTierChange={onTierChange} onDeleteAssignment={onDeleteAssignment}/>
    )
    const cardActions = <TierCardActions onClear={onClear} onSave={onSave} onDelete={onDelete} mode={mode}/>

    return <EntityCard cardHeader={cardHeader} cardContent={cardContent} cardActions={cardActions} {...props}/>
}

export default TierCard;