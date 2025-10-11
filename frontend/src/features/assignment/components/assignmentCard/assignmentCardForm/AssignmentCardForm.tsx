import React, { HTMLAttributes } from 'react';
import { Assignment } from '../../../model/Assignment.types';
import { TextField } from '@mui/material';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import EntityCardForm from '../../../../../components/entityCard/entityCardForm/EntityCardForm';

export interface AssignmentCardFormProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
    onAssignmentChange: (assignment: Assignment) => void
    mode: Mode
}

const AssignmentCardForm = ({ assignment, onAssignmentChange, mode, ...props }: AssignmentCardFormProps) => {
    const editable = mode === Mode.EDIT

    return (
        <EntityCardForm {...props}>
            <TextField
                label="Option ID"
                type="text"
                value={assignment.optionId}
                onChange={e => editable ? onAssignmentChange({...assignment, optionId: e.target.value}) : null}/>
            <TextField
                label="Tier ID"
                type="text"
                value={assignment.tierId}
                onChange={e => editable ? onAssignmentChange({...assignment, tierId: e.target.value}) : null}/>
        </EntityCardForm>
    )
}

export default AssignmentCardForm;