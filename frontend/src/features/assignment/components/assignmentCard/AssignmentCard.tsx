import React, { HTMLAttributes, useState } from 'react';
import { Assignment } from '../../model/Assignment.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import AssignmentCardHeader from './assignmentCardHeader/AssignmentCardHeader';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Restore';
import { Mode } from '../../../../components/entityCard/EntityCard';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import AssignmentIcon from '../assignmentIcon/AssignmentIcon';
import AssignmentCardForm from './assignmentCardForm/AssignmentCardForm';
import EntityCardActions, { Action } from '../../../../components/entityCard/entityCardActions/EntityCardActions';

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
        iconProps: { size: "large", color: "info" },
        icon: <ClearIcon/>,
        onClick: handleClear,
        disabled: executing || mode === Mode.VIEW
    }

    const saveAction: Action = {
        iconProps: { size: "large", color: "info" },
        icon: <SaveIcon/>,
        onClick: handleSave,
        disabled: executing || mode === Mode.VIEW
    }

    const deleteAction: Action = {
        iconProps: { size: "large", color: "error" },
        icon: <DeleteIcon/>,
        onClick: handleDelete,
        disabled: executing || mode === Mode.VIEW
    }

    const tabs = [
        {
            icon: <AssignmentIcon/>,
            label: "Assignment",
            view: <AssignmentCardForm assignment={assignment} onAssignmentChange={onAssignmentChange} mode={mode}/>,
            actions: [clearAction, saveAction, deleteAction]
        }
    ]

    const cardHeader = <AssignmentCardHeader assignment={assignment}/>
    const cardContent = <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs} {...props}/>
    const cardActions = <EntityCardActions actions={tabs[activeTabIndex].actions} {...props}/>

    return <EntityCard cardHeader={cardHeader} cardContent={cardContent} cardActions={cardActions} {...props}/>
}

export default AssignmentCard;