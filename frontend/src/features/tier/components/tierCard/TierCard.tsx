import React, { HTMLAttributes, useState } from 'react';
import { Tier } from '../../model/Tier.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import TierCardHeader from './tierCardHeader/TierCardHeader';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import RestoreIcon from '@mui/icons-material/Restore';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { Assignment } from '../../../assignment/model/Assignment.types';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import TierIcon from '../tierIcon/TierIcon';
import TierCardForm from './tierCardForm/TierCardForm';
import AssignmentIcon from '../../../assignment/components/assignmentIcon/AssignmentIcon';
import AssignmentsList from '../../../assignment/components/assignmentsList/AssignmentsList';
import { appAssignmentRoute } from '../../../../app/Routes';
import EntityCardActions, { Action } from '../../../../components/entityCard/entityCardActions/EntityCardActions';
import ActionButton from '../../../../components/actionButton/ActionButton';

export const TierAssignmentsTabView = (
    {assignments, editMode, onDeleteAssignment}: {assignments: Assignment[], editMode: boolean, onDeleteAssignment: (assignment: Assignment)=>Promise<void>}
) => {
    const sortedAssignments = assignments.sort((a,b) => a.order! - b.order!)

    const handleDelete = async (e: React.MouseEvent, assignment: Assignment) => {
        e.preventDefault()
        await onDeleteAssignment(assignment)
    }

    return (
        <AssignmentsList
            assignments={sortedAssignments}
            assignmentUrl={assignment => appAssignmentRoute(assignment.id!)}
            chipActions={assignment => [
                 editMode ?
                    <ActionButton buttonAction={e => handleDelete(e, assignment)} color='error' size='small'>
                        <ClearIcon fontSize='small'/>
                    </ActionButton> :
                    null
            ]}/>
    )
}

export interface TierCardProps extends HTMLAttributes<HTMLDivElement> {
    tier: Tier
    assignments: Assignment[]
    mode: Mode
    onTierChange: (changedTier: Tier) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
    onDeleteAssignment: (assignment: Assignment) => Promise<void>
}

const TierCard = ({ tier, assignments, mode, onTierChange, onClear, onSave, onDelete, onDeleteAssignment, ...props }: TierCardProps) => {
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
            icon: <TierIcon/>,
            label: "Tier",
            view: <TierCardForm tier={tier} onTierChange={onTierChange} mode={mode}/>,
            actions: [clearAction, saveAction, deleteAction]
        },
        {
            icon: <AssignmentIcon/>,
            label: "Assignments",
            view: <TierAssignmentsTabView assignments={assignments} editMode={editMode} onDeleteAssignment={onDeleteAssignment}/>,
            actions: []
        }
    ]

    const cardHeader = <TierCardHeader tier={tier}/>
    const cardContent = <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs} {...props}/>
    const cardActions = <EntityCardActions actions={tabs[activeTabIndex].actions} {...props}/>

    return <EntityCard cardHeader={cardHeader} cardContent={cardContent} cardActions={cardActions} {...props}/>
}

export default TierCard;