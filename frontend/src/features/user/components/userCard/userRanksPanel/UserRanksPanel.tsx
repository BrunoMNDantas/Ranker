import React, { useState } from 'react';
import classes from './UserRanksPanel.module.css'
import { Rank } from '../../../../rank/model/Rank.types';
import RanksList from '../../../../rank/components/ranksList/RanksList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appRankRoute } from '../../../../../app/Routes';
import ActionButton from '../../../../../components/actionButton/ActionButton';
import { IconButton, Divider } from '@mui/material';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import EntityCardActions, { Action } from '../../../../../components/entityCard/entityCardActions/EntityCardActions';
import RankCreateIcon from '../../../../rank/components/rankCreateIcon/RankCreateIcon';

export interface UserRanksPanelProps {
    ranks: Rank[]
    mode: Mode
    onDeleteRank: (rank: Rank) => Promise<void>
    onCreateRank: () => Promise<void>
}

export const UserRanksPanel = ({ ranks, mode, onDeleteRank, onCreateRank }: UserRanksPanelProps) => {
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

    const handleDelete = async (rank: Rank) => {
        await onDeleteRank(rank)
    }

    const handleCreateRank = () => execute(onCreateRank)

    const createRankAction: Action = {
        iconProps: { color: "info" },
        icon: <RankCreateIcon/>,
        onClick: handleCreateRank,
        disabled: executing || !editMode
    }

    const getChipActions = (rank: Rank) => {
        return [
            <IconButton href={appRankRoute(rank.id)} color='info' size='small'>
                <VisibilityIcon fontSize='small' />
            </IconButton>,
            <ActionButton buttonAction={e => handleDelete(rank)} color='error' size='small' disabled={!editMode}>
                <ClearIcon fontSize='small' />
            </ActionButton>
        ]
    }

    return (
        <div className={classes.root}>
            <RanksList rankIds={ranks.map(r => r.id)} chipActions={getChipActions}/>
            <Divider/>
            <EntityCardActions actions={[createRankAction]}/>
        </div>
    )
}

export default UserRanksPanel;
