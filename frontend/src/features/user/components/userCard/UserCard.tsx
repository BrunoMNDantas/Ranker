import React, { HTMLAttributes, useState } from 'react';
import EntityCard from '../../../../components/entityCard/EntityCard';
import UserCardHeader from './userCardHeader/UserCardHeader';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import { Mode } from '../../../../components/entityCard/EntityCard';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import UserIcon from '../userIcon/UserIcon';
import UserCardForm from './userCardForm/UserCardForm';
import EntityCardActions, { Action } from '../../../../components/entityCard/entityCardActions/EntityCardActions';
import { User } from '../../model/User.types';
import RankIcon from '../../../rank/components/rankIcon/RankIcon';
import UserRanksTabView from './UserRanksTabView';
import VoteIcon from '../../../vote/components/voteIcon/VoteIcon';
import UserVotesTabView from './UserVotesTabView';
import { Rank } from '../../../rank/model/Rank.types';
import { Vote } from '../../../vote/model/Vote.types';
import RankCreateIcon from '../../../rank/components/rankCreateIcon/RankCreateIcon';

export interface UserCardProps extends HTMLAttributes<HTMLDivElement> {
    user: User
    ranks: Rank[]
    votes: Vote[]
    mode: Mode
    onUserChange: (changedUser: User) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
    onCreateRank: () => Promise<void>
    onDeleteRank: (rank: Rank) => Promise<void>
    onDeleteVote: (vote: Vote) => Promise<void>
}

const UserCard = ({
    user, ranks, votes, mode,
    onUserChange, onClear, onSave, onDelete,
    onCreateRank, onDeleteRank, onDeleteVote,
    ...props
}: UserCardProps) => {
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
    const handleCreateRank = () => execute(onCreateRank)

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

    const createRankAction: Action = {
        iconProps: { color: "info" },
        icon: <RankCreateIcon/>,
        onClick: handleCreateRank,
        disabled: executing || !editMode
    }

    const tabs = [
        {
            icon: <UserIcon/>,
            label: "User",
            view: <UserCardForm user={user} onUserChange={onUserChange} mode={mode}/>,
            actions: [clearAction, saveAction, deleteAction]
        },
        {
            label: "Ranks",
            icon: <RankIcon/>,
            view: <UserRanksTabView ranks={ranks} editMode={editMode} onDeleteRank={onDeleteRank}/>,
            actions: [createRankAction]
        },
        {
            label: "Votes",
            icon: <VoteIcon/>,
            view: <UserVotesTabView votes={votes} editMode={editMode} onDeleteVote={onDeleteVote}/>,
            actions: []
        }
    ]

    const cardHeader = <UserCardHeader user={user}/>
    const cardContent = <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs} {...props}/>
    const cardActions = <EntityCardActions actions={tabs[activeTabIndex].actions} {...props}/>

    return <EntityCard {...props}>{[cardHeader, cardContent, cardActions]}</EntityCard>
}

export default UserCard;