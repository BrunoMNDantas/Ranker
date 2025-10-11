import React, { HTMLAttributes, useState } from 'react';
import { Tier } from '../../model/Tier.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import TierCardHeader from './tierCardHeader/TierCardHeader';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { Assignment } from '../../../assignment/model/Assignment.types';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import TierIcon from '../tierIcon/TierIcon';
import AssignmentIcon from '../../../assignment/components/assignmentIcon/AssignmentIcon';
import TierAssignmentsPanel from './tierAssignmentsPanel/TierAssignmentsPanel';
import TierFormPanel from './tierFormPanel/TierFormPanel';

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
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const tabs = [
        {
            icon: <TierIcon/>,
            label: "Tier",
            view: <TierFormPanel tier={tier} onTierChange={onTierChange} mode={mode} onClear={onClear} onSave={onSave} onDelete={onDelete}/>
        },
        {
            icon: <AssignmentIcon/>,
            label: "Assignments",
            view: <TierAssignmentsPanel assignments={assignments} mode={mode} onDeleteAssignment={onDeleteAssignment}/>
        }
    ]

    return (
        <EntityCard {...props}>
            <TierCardHeader tier={tier}/>
            <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs}/>
        </EntityCard>
    )
}

export default TierCard;