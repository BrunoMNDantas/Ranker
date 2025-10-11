import React, { useState } from 'react';
import classes from './AssignmentFormPanel.module.css'
import { Mode } from '../../../../../components/entityCard/EntityCard';
import { Assignment } from '../../../model/Assignment.types';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import EntityCardActions, { Action } from '../../../../../components/entityCard/entityCardActions/EntityCardActions';
import AssignmentCardForm from '../assignmentCardForm/AssignmentCardForm';
import { Divider } from '@mui/material';

export interface AssignmentFormPanelProps {
    assignment: Assignment
    mode: Mode
    onAssignmentChange: (changedAssignment: Assignment) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
}

export const AssignmentFormPanel = ({ assignment, mode, onAssignmentChange, onClear, onSave, onDelete }: AssignmentFormPanelProps) => {
    const [executing, setExecuting] = useState(false)
    const editMode = mode === Mode.EDIT

    const execute = async (action: ()=>Promise<void>) => {
        setExecuting(true)
        try {
            return await action()
        } finally {
            return setExecuting(false)
        }
    }

    const handleClear = () => execute(onClear)
    const handleSave = () => execute(onSave)
    const handleDelete = () => execute(onDelete)

    const clearAction: Action = {
        iconProps: { color: "info" },
        icon: <RestoreIcon/>,
        onClick: handleClear,
        disabled: executing || !editMode
    }

    const saveAction: Action = {
        iconProps: { color: "info" },
        icon: <SaveIcon/>,
        onClick: handleSave,
        disabled: executing || !editMode
    }

    const deleteAction: Action = {
        iconProps: { color: "error" },
        icon: <DeleteIcon/>,
        onClick: handleDelete,
        disabled: executing || !editMode
    }

    return (
        <div className={classes.root}>
            <AssignmentCardForm assignment={assignment} onAssignmentChange={onAssignmentChange} mode={mode}/>
            <Divider/>
            <EntityCardActions actions={[clearAction, saveAction, deleteAction]}/>
        </div>
    )
}

export default AssignmentFormPanel;
