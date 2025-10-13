import { useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { selectRanksOfUser } from '../../../../rank/store/Rank.selectors';
import { createRankThunk, deleteRankThunk } from '../../../../rank/store/Rank.thunks';
import RankFormModal from '../../../../rank/components/rankFormModal/RankFormModal';
import { createRank } from '../../../../../services/EntityFactory.service';

export interface UserRanksPanelProps {
    userId: string
    mode: Mode
}

export const UserRanksPanel = ({ userId, mode }: UserRanksPanelProps) => {
    const dispatch = useAppDispatch()
    const ranks = useAppSelector((state) => selectRanksOfUser(state, userId))
    const [executing, setExecuting] = useState(false)
    const [showRankModal, setShowRankModal] = useState(false)
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
        await execute(async () => {
            await dispatch(deleteRankThunk(rank.id)).unwrap()
        })
    }

    const handleCreateRankClick = async () => {
        setShowRankModal(true)
    }

    const handleCreateRank = async (rank: Rank) => {
        await execute(async () => {
            await dispatch(createRankThunk(rank)).unwrap()
            setShowRankModal(false)
        })
    }

    const handleCreateRankCancel = () => {
        setShowRankModal(false)
        return Promise.resolve()
    }

    const createRankAction: Action = {
        iconProps: { color: "info" },
        icon: <RankCreateIcon/>,
        onClick: handleCreateRankClick,
        disabled: executing || !editMode
    }

    const getChipActions = (rank: Rank) => {
        return [
            <IconButton href={appRankRoute(rank.id)} color='info' size='small'>
                <VisibilityIcon fontSize='small' />
            </IconButton>,
            <ActionButton buttonAction={() => handleDelete(rank)} color='error' size='small' disabled={!editMode}>
                <ClearIcon fontSize='small' />
            </ActionButton>
        ]
    }

    return (
        <>
            <div className={classes.root}>
                <RanksList rankIds={ranks.map(r => r.id)} chipActions={getChipActions}/>
                <Divider/>
                <EntityCardActions actions={[createRankAction]}/>
            </div>
            <RankFormModal
                open={showRankModal}
                defaultRank={createRank({ ownerId: userId })}
                onCancel={handleCreateRankCancel}
                onCreate={handleCreateRank}/>
        </>
    )
}

export default UserRanksPanel;
