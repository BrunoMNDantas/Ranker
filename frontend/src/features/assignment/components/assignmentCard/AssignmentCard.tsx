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
    const cardHeader = <AssignmentCardHeader assignment={assignment}/>
    const cardContent = <AssignmentCardContent assignment={assignment} mode={mode} onAssignmentChange={onAssignmentChange}/>
    const cardActions = <AssignmentCardActions onClear={onClear} onSave={onSave} onDelete={onDelete} mode={mode}/>

    return <EntityCard cardHeader={cardHeader} cardContent={cardContent} cardActions={cardActions} {...props}/>
}

export default AssignmentCard;