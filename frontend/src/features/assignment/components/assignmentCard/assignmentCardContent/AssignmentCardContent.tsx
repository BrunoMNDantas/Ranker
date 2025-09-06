import React, { HTMLAttributes } from 'react';
import { Assignment } from '../../../model/Assignment.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { TextField } from '@mui/material';

export interface AssignmentCardContentProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
    onAssignmentChange: (assignment: Assignment) => void
}

const AssignmentCardContent = ({ assignment, onAssignmentChange, ...props }: AssignmentCardContentProps) => {
    const properties = [
        <TextField
            label="Order"
            type="number"
            value={assignment.order || ""}
            onChange={e => onAssignmentChange({...assignment, order: parseInt(e.target.value) || null})}/>,
        <TextField
            label="Option ID"
            type="text"
            value={assignment.optionId || ""}
            onChange={e => onAssignmentChange({...assignment, optionId: e.target.value})}/>,
        <TextField
            label="Tier ID"
            type="text"
            value={assignment.tierId || ""}
            onChange={e => onAssignmentChange({...assignment, tierId: e.target.value})}/>
    ]

    return <EntityCardContent properties={properties} {...props}/>
}

export default AssignmentCardContent;