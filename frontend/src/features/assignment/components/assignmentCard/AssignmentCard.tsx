import React, { HTMLAttributes, useState } from 'react';
import { Assignment } from '../../model/Assignment.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import AssignmentCardHeader from './assignmentCardHeader/AssignmentCardHeader';
import { Mode } from '../../../../components/entityCard/EntityCard';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import AssignmentIcon from '../assignmentIcon/AssignmentIcon';
import AssignmentFormPanel from './assignmentFormPanel/AssignmentFormPanel';

export interface AssignmentCardProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
    mode: Mode
    onAssignmentChange: (changedAssignment: Assignment) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
}

const AssignmentCard = ({ assignment, mode, onAssignmentChange, onClear, onSave, onDelete, ...props }: AssignmentCardProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const tabs = [
        {
            icon: <AssignmentIcon/>,
            label: "Assignment",
            view: <AssignmentFormPanel assignment={assignment} onAssignmentChange={onAssignmentChange} mode={mode} onClear={onClear} onSave={onSave} onDelete={onDelete}/>
        }
    ]

    return (
        <EntityCard {...props}>
            <AssignmentCardHeader assignment={assignment}/>
            <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs}/>
        </EntityCard>
    )
}

export default AssignmentCard;