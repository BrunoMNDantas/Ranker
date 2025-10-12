import React, { useState, useEffect } from 'react';
import classes from './VoteFormPanel.module.css'
import { Mode } from '../../../../../components/entityCard/EntityCard';
import { Vote } from '../../../model/Vote.types';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import EntityCardActions, { Action } from '../../../../../components/entityCard/entityCardActions/EntityCardActions';
import VoteCardForm from '../voteCardForm/VoteCardForm';
import { Divider } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { selectVoteById } from '../../../store/Vote.selectors';
import { updateVote } from '../../../store/Vote.slice';
import { updateVoteThunk, deleteVoteThunk } from '../../../store/Vote.thunks';
import { useNavigate } from 'react-router-dom';
import { APP_VOTES_ROUTE } from '../../../../../app/Routes';

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

    const handleVoteChange = (changedVote: Vote) => {
        dispatch(updateVote({ id: changedVote.id, changes: changedVote }))
    }

    const handleClear = () => {
        return execute(async () => {
            if (originalVote) {
                dispatch(updateVote({ id: originalVote.id, changes: originalVote }))
            }
        })
    }

    const handleSave = () => {
        return execute(async () => {
            await dispatch(updateVoteThunk(vote)).unwrap()
        })
    }

    const handleDelete = () => {
        return execute(async () => {
            await dispatch(deleteVoteThunk(voteId)).unwrap()
            navigate(APP_VOTES_ROUTE)
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
            <VoteCardForm vote={vote} onVoteChange={handleVoteChange} mode={mode}/>
            <Divider/>
            <EntityCardActions actions={[clearAction, saveAction, deleteAction]}/>
        </div>
    )
}

export default VoteFormPanel;