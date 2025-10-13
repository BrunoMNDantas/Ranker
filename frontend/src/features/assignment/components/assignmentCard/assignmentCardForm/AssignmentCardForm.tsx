import React, { HTMLAttributes } from 'react';
import { TextField } from '@mui/material';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import EntityCardForm from '../../../../../components/entityCard/entityCardForm/EntityCardForm';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { selectAssignmentById } from '../../../store/Assignment.selectors';
import { updateAssignment } from '../../../store/Assignment.slice';

export interface AssignmentCardFormProps extends HTMLAttributes<HTMLDivElement> {
    assignmentId: string
    mode: Mode
}

const AssignmentCardForm = ({ assignmentId, mode, ...props }: AssignmentCardFormProps) => {
    const dispatch = useAppDispatch()
    const assignment = useAppSelector((state) => selectAssignmentById(state, assignmentId))
    const editable = mode === Mode.EDIT

    if (!assignment) {
        return null
    }

    const handleFieldChange = (changes: Partial<typeof assignment>) => {
        if (editable) {
            dispatch(updateAssignment({ id: assignmentId, changes }))
        }
    }

    return (
        <EntityCardForm {...props}>
            <TextField
                label="Option ID"
                type="text"
                value={assignment.optionId}
                onChange={e => handleFieldChange({ optionId: e.target.value })}/>
            <TextField
                label="Tier ID"
                type="text"
                value={assignment.tierId}
                onChange={e => handleFieldChange({ tierId: e.target.value })}/>
        </EntityCardForm>
    )
}

export default AssignmentCardForm;