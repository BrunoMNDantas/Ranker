import { useState, useEffect } from 'react';
import classes from './VoteFormPanel.module.css'
import { Mode } from '../../../../../components/entityCard/EntityCard';
import { Vote } from '../../../model/Vote.types';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import EntityCardActions, { Action } from '../../../../../components/entityCard/entityCardActions/EntityCardActions';
import VoteForm from '../../voteForm/VoteForm';
import { Divider } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { selectVoteById } from '../../../store/Vote.selectors';
import { updateVote } from '../../../store/Vote.slice';
import { updateVoteThunk, deleteVoteThunk } from '../../../store/Vote.thunks';
import { useNavigate } from 'react-router-dom';
import { APP_RANKS_ROUTE } from '../../../../../app/Routes';

export interface VoteFormPanelProps {
    voteId: string
    mode: Mode
}

export const VoteFormPanel = ({ voteId, mode }: VoteFormPanelProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const vote = useAppSelector((state) => selectVoteById(state, voteId))
    const [originalVote, setOriginalVote] = useState<Vote | null>(null)
    const [executing, setExecuting] = useState(false)
    const editMode = mode === Mode.EDIT

    useEffect(() => {
        if (vote && !originalVote) {
            setOriginalVote(structuredClone(vote))
        }
    }, [vote, originalVote])

    if (!vote) {
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
            if (originalVote) {
                dispatch(updateVote({ id: originalVote.id, changes: originalVote }))
            }
        })
    }

    const handleSave = async () => {
        await execute(async () => {
            await dispatch(updateVoteThunk(vote)).unwrap()
        })
    }

    const handleDelete = async () => {
        await execute(async () => {
            await dispatch(deleteVoteThunk(voteId)).unwrap()
            navigate(APP_RANKS_ROUTE)
        })
    }

    const clearAction: Action = {
        iconProps: { color: "info" },
        icon: <RestoreIcon/>,
        onClick: handleClear,
        disabled: executing || !editMode,
        testId: "vote-clear-button"
    }

    const saveAction: Action = {
        iconProps: { color: "info" },
        icon: <SaveIcon/>,
        onClick: handleSave,
        disabled: executing || !editMode,
        testId: "vote-save-button"
    }

    const deleteAction: Action = {
        iconProps: { color: "error" },
        icon: <DeleteIcon/>,
        onClick: handleDelete,
        disabled: executing || !editMode,
        testId: "vote-delete-button"
    }

    return (
        <div className={classes.root}>
            <VoteForm voteId={voteId} mode={mode}/>
            <Divider/>
            <EntityCardActions actions={[clearAction, saveAction, deleteAction]}/>
        </div>
    )
}

export default VoteFormPanel;