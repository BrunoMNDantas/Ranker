import { useState, useEffect } from 'react';
import classes from './RankFormPanel.module.css'
import { Mode } from '../../../../../components/entityCard/EntityCard';
import { Rank } from '../../../model/Rank.types';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import EntityCardActions, { Action } from '../../../../../components/entityCard/entityCardActions/EntityCardActions';
import RankForm from '../../rankForm/RankForm';
import { Divider } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { selectRankById } from '../../../store/Rank.selectors';
import { updateRank } from '../../../store/Rank.slice';
import { updateRankThunk, deleteRankThunk } from '../../../store/Rank.thunks';
import { useNavigate } from 'react-router-dom';
import { APP_RANKS_ROUTE } from '../../../../../app/Routes';

export interface RankFormPanelProps {
    rankId: string
    mode: Mode
}

export const RankFormPanel = ({ rankId, mode }: RankFormPanelProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const rank = useAppSelector((state) => selectRankById(state, rankId))
    const [originalRank, setOriginalRank] = useState<Rank | null>(null)
    const [executing, setExecuting] = useState(false)
    const editMode = mode === Mode.EDIT

    useEffect(() => {
        if (rank && !originalRank) {
            setOriginalRank(structuredClone(rank))
        }
    }, [rank, originalRank])

    if (!rank) {
        return null
    }

    const execute = async (action: ()=>Promise<void>) => {
        setExecuting(true)
        try {
            return await action()
        } finally {
            return setExecuting(false)
        }
    }

    const handleClear = async () => {
        await execute(async () => {
            if (originalRank) {
                dispatch(updateRank({ id: originalRank.id, changes: originalRank }))
            }
        })
    }

    const handleSave = async () => {
        await execute(async () => {
            await dispatch(updateRankThunk(rank)).unwrap()
        })
    }

    const handleDelete = async () => {
        await execute(async () => {
            await dispatch(deleteRankThunk(rankId)).unwrap()
            navigate(APP_RANKS_ROUTE)
        })
    }

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
            <RankForm rankId={rankId} mode={mode}/>
            <Divider/>
            <EntityCardActions actions={[clearAction, saveAction, deleteAction]}/>
        </div>
    )
}

export default RankFormPanel;
