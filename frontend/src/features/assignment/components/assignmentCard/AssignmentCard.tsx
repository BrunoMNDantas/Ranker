import React, { HTMLAttributes } from 'react';
import { Assignment } from '../../model/Assignment.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import AssignmentCardHeader from './assignmentCardHeader/AssignmentCardHeader';
import AssignmentCardActions from './assignmentCardActions/AssignmentCardActions';
import AssignmentCardContent from './assignmentCardContent/AssignmentCardContent';
import { Mode } from '../../../../components/entityCard/EntityCard';

export interface AssignmentCardProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
    mode: Mode
    onAssignmentChange: (changedAssignment: Assignment) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
}

const AssignmentCard = ({ assignment, mode, onAssignmentChange, onClear, onSave, onDelete, ...props }: AssignmentCardProps) => {
    return (
        <EntityCard
            cardHeader={<AssignmentCardHeader assignment={assignment}/>}
            cardContent={<AssignmentCardContent assignment={assignment} onAssignmentChange={onAssignmentChange} mode={mode}/>}
            cardActions={<AssignmentCardActions onClear={onClear} onSave={onSave} onDelete={onDelete} mode={mode}/>}
            {...props}/>
    );
}

export default AssignmentCard;