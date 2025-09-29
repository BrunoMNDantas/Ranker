import React, { HTMLAttributes, useState } from 'react';
import EntityCard from '../../../../components/entityCard/EntityCard';
import UserCardHeader from './userCardHeader/UserCardHeader';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { Assignment } from '../../../assignment/model/Assignment.types';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import UserIcon from '../userIcon/UserIcon';
import UserCardForm from './userCardForm/UserCardForm';
import AssignmentIcon from '../../../assignment/components/assignmentIcon/AssignmentIcon';
import EntityCardActions, { Action } from '../../../../components/entityCard/entityCardActions/EntityCardActions';
import { User } from '../../model/User.types';

export interface UserCardProps extends HTMLAttributes<HTMLDivElement> {
    user: User
    mode: Mode
    onUserChange: (changedUser: User) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
}

const UserCard = ({ user, mode, onUserChange, onClear, onSave, onDelete, ...props }: UserCardProps) => {
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
            icon: <UserIcon/>,
            label: "User",
            view: <UserCardForm user={user} onUserChange={onUserChange} mode={mode}/>,
            actions: [clearAction, saveAction, deleteAction]
        }
    ]

    const cardHeader = <UserCardHeader user={user}/>
    const cardContent = <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs} {...props}/>
    const cardActions = <EntityCardActions actions={tabs[activeTabIndex].actions} {...props}/>

    return <EntityCard cardHeader={cardHeader} cardContent={cardContent} cardActions={cardActions} {...props}/>
}

export default UserCard;