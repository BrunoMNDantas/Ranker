import React, { HTMLAttributes, useState } from 'react';
import { Assignment } from '../../../model/Assignment.types';
import ClearIcon from '@mui/icons-material/Restore';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EntityCardActions, { Action } from '../../../../../components/entityCard/entityCardActions/EntityCardActions';
import { Mode } from '../../../../../components/entityCard/EntityCard';

export interface AssignmentCardActionsProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
    mode: Mode
}

const AssignmentCardActions = ({ assignment, onClear, onSave, onDelete, mode, ...props }: AssignmentCardActionsProps) => {
    const [executing, setExecuting] = useState(false)

    const handleClear = () => {
        setExecuting(true)
        return onClear().finally(() => setExecuting(false))
    }

    const handleSave = () => {
        setExecuting(true)
        return onSave().finally(() => setExecuting(false))
    }

    const handleDelete = () => {
        setExecuting(true)
        return onDelete().finally(() => setExecuting(false))
    }

    const action: Action[] = [
        {
            iconProps: { size: "large", color: "info" },
            icon: <ClearIcon/>,
            onClick: handleClear,
            disabled: executing || mode === Mode.VIEW
        },
        {
            iconProps: { size: "large", color: "info" },
            icon: <SaveIcon/>,
            onClick: handleSave,
            disabled: executing || mode === Mode.VIEW
        },
        {
            iconProps: { size: "large", color: "error" },
            icon: <DeleteIcon/>,
            onClick: handleDelete,
            disabled: executing || mode === Mode.VIEW
        }
    ]

    return <EntityCardActions actions={action} {...props}/>
}

export default AssignmentCardActions;