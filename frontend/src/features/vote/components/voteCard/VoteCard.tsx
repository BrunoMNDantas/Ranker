import React, { HTMLAttributes, useState } from 'react';
import { Vote } from '../../model/Vote.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import VoteCardHeader from './voteCardHeader/VoteCardHeader';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { Assignment } from '../../../assignment/model/Assignment.types';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import VoteIcon from '../voteIcon/VoteIcon';
import VoteCardForm from './voteCardForm/VoteCardForm';
import AssignmentIcon from '../../../assignment/components/assignmentIcon/AssignmentIcon';
import EntityCardActions, { Action } from '../../../../components/entityCard/entityCardActions/EntityCardActions';
import VoteAssignmentsTabView from './VoteAssignmentsTabView';

export interface VoteCardProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
    assignments: Assignment[]
    mode: Mode
    onVoteChange: (changedVote: Vote) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
    onDeleteAssignment: (assignment: Assignment) => Promise<void>
}

const VoteCard = ({ vote, assignments, mode, onVoteChange, onClear, onSave, onDelete, onDeleteAssignment, ...props }: VoteCardProps) => {
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
            icon: <VoteIcon/>,
            label: "Vote",
            view: <VoteCardForm vote={vote} onVoteChange={onVoteChange} mode={mode}/>,
            actions: [clearAction, saveAction, deleteAction]
        },
        {
            icon: <AssignmentIcon/>,
            label: "Assignments",
            view: <VoteAssignmentsTabView assignments={assignments} editMode={editMode} onDeleteAssignment={onDeleteAssignment}/>,
            actions: []
        }
    ]

    const cardHeader =<VoteCardHeader vote={vote}/>
    const cardContent = <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs} {...props}/>
    const cardActions = <EntityCardActions actions={tabs[activeTabIndex].actions} {...props}/>

    return <EntityCard {...props}>{[cardHeader, cardContent, cardActions]}</EntityCard>
}

export default VoteCard;