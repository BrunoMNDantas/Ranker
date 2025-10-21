import { useState, useEffect } from 'react';
import classes from './TierFormPanel.module.css'
import { Mode } from '../../../../../components/entityCard/EntityCard';
import { Tier } from '../../../model/Tier.types';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import EntityCardActions, { Action } from '../../../../../components/entityCard/entityCardActions/EntityCardActions';
import TierForm from '../../tierForm/TierForm';
import { Divider } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { selectTierById } from '../../../store/Tier.selectors';
import { updateTier } from '../../../store/Tier.slice';
import { updateTierThunk, deleteTierThunk } from '../../../store/Tier.thunks';
import { useNavigate } from 'react-router-dom';
import { APP_RANKS_ROUTE } from '../../../../../app/Routes';

export interface TierFormPanelProps {
    tierId: string
    mode: Mode
}

export const TierFormPanel = ({ tierId, mode }: TierFormPanelProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const tier = useAppSelector((state) => selectTierById(state, tierId))
    const [originalTier, setOriginalTier] = useState<Tier | null>(null)
    const [executing, setExecuting] = useState(false)
    const editMode = mode === Mode.EDIT

    useEffect(() => {
        if (tier && !originalTier) {
            setOriginalTier(structuredClone(tier))
        }
    }, [tier, originalTier])

    if (!tier) {
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
            if (originalTier) {
                dispatch(updateTier({ id: originalTier.id, changes: originalTier }))
            }
        })
    }

    const handleSave = async () => {
        await execute(async () => {
            await dispatch(updateTierThunk(tier)).unwrap()
        })
    }

    const handleDelete = async () => {
        await execute(async () => {
            await dispatch(deleteTierThunk(tierId)).unwrap()
            navigate(APP_RANKS_ROUTE)
        })
    }

    const clearAction: Action = {
        iconProps: { color: "info" },
        icon: <RestoreIcon/>,
        onClick: handleClear,
        disabled: executing || !editMode,
        testId: "tier-clear-button"
    }

    const saveAction: Action = {
        iconProps: { color: "info" },
        icon: <SaveIcon/>,
        onClick: handleSave,
        disabled: executing || !editMode,
        testId: "tier-save-button"
    }

    const deleteAction: Action = {
        iconProps: { color: "error" },
        icon: <DeleteIcon/>,
        onClick: handleDelete,
        disabled: executing || !editMode,
        testId: "tier-delete-button"
    }

    return (
        <div className={classes.root}>
            <TierForm tierId={tierId} mode={mode}/>
            <Divider/>
            <EntityCardActions actions={[clearAction, saveAction, deleteAction]}/>
        </div>
    )
}

export default TierFormPanel;
