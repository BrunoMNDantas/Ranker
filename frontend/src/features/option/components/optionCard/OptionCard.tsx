import React, { HTMLAttributes, useState } from 'react';
import { Option } from '../../model/Option.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import OptionCardHeader from './optionCardHeader/OptionCardHeader';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { Assignment } from '../../../assignment/model/Assignment.types';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import OptionIcon from '../optionIcon/OptionIcon';
import OptionCardForm from './optionCardForm/OptionCardForm';
import AssignmentIcon from '../../../assignment/components/assignmentIcon/AssignmentIcon';
import EntityCardActions, { Action } from '../../../../components/entityCard/entityCardActions/EntityCardActions';
import OptionAssignmentsTabView from './OptionAssignmentsTabView';

export interface OptionCardProps extends HTMLAttributes<HTMLDivElement> {
    option: Option
    assignments: Assignment[]
    mode: Mode
    onOptionChange: (changedOption: Option) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
    onDeleteAssignment: (assignment: Assignment) => Promise<void>
}

const OptionCard = ({ option, assignments, mode, onOptionChange, onClear, onSave, onDelete, onDeleteAssignment, ...props }: OptionCardProps) => {
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

    const tabs = [
        {
            icon: <OptionIcon/>,
            label: "Option",
            view: <OptionCardForm option={option} onOptionChange={onOptionChange} mode={mode}/>,
            actions: [clearAction, saveAction, deleteAction]
        },
        {
            icon: <AssignmentIcon/>,
            label: "Assignments",
            view: <OptionAssignmentsTabView assignments={assignments} editMode={editMode} onDeleteAssignment={onDeleteAssignment}/>,
            actions: []
        }
    ]

    const cardHeader = <OptionCardHeader option={option}/>
    const cardContent = <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs} {...props}/>
    const cardActions = <EntityCardActions actions={tabs[activeTabIndex].actions} {...props}/>

    return <EntityCard cardHeader={cardHeader} cardContent={cardContent} cardActions={cardActions} {...props}/>
}

export default OptionCard;