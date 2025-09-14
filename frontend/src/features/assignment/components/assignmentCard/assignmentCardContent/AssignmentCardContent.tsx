import React, { HTMLAttributes } from 'react';
import { Assignment } from '../../../model/Assignment.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { TextField } from '@mui/material';
import { Mode } from '../../../../../components/entityCard/EntityCard';

export interface AssignmentCardContentProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
    onAssignmentChange: (assignment: Assignment) => void
    mode: Mode
}

const AssignmentCardContent = ({ assignment, onAssignmentChange, mode, ...props }: AssignmentCardContentProps) => {
    const editable = mode === Mode.EDIT

    const properties = [
        <TextField
            label="Order"
            type="number"
            value={assignment.order || ""}
            onChange={e => editable ? onAssignmentChange({...assignment, order: parseInt(e.target.value) || null}) : null}/>,
        <TextField
            label="Option ID"
            type="text"
            value={assignment.optionId || ""}
            onChange={e => editable ? onAssignmentChange({...assignment, optionId: e.target.value}) : null}/>,
        <TextField
            label="Tier ID"
            type="text"
            value={assignment.tierId || ""}
            onChange={e => editable ? onAssignmentChange({...assignment, tierId: e.target.value}) : null}/>
    ]

    return <EntityCardContent properties={properties} {...props}/>
}

export default AssignmentCardContent;