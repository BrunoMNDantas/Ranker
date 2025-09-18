import React, { HTMLAttributes } from 'react';
import { Tier } from '../../../model/Tier.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import TierCardForm from '../tierCardForm/TierCardForm';
import TierIcon from '../../tierIcon/TierIcon';
import AssignmentIcon from '../../../../assignment/components/assignmentIcon/AssignmentIcon';
import AssignmentsList from '../../../../assignment/components/assignmentsList/AssignmentsList';
import { Assignment } from '../../../../assignment/model/Assignment.types';
import { appAssignmentRoute } from '../../../../../app/Routes';

export interface TierCardContentProps extends HTMLAttributes<HTMLDivElement> {
    tier: Tier
    assignments: Assignment[]
    onTierChange: (tier: Tier) => void
    mode: Mode
}

const TierCardContent = ({ tier, assignments, onTierChange, mode, ...props }: TierCardContentProps) => {
    const tabs = [
        {
            icon: <TierIcon/>,
            label: "Tier",
            view: <TierCardForm tier={tier} onTierChange={onTierChange} mode={mode}/>
        },
        {
            icon: <AssignmentIcon/>,
            label: "Assignments",
            view: <AssignmentsList assignments={assignments} assignmentUrl={assignment => appAssignmentRoute(assignment.id!)}/>
        }
    ]

    return <EntityCardContent tabs={tabs} {...props}/>
}

export default TierCardContent;