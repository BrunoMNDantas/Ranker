import { useState } from 'react';
import classes from './UserVotesPanel.module.css'
import { Vote } from '../../../../vote/model/Vote.types';
import VotesList from '../../../../vote/components/votesList/VotesList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appVoteRoute } from '../../../../../app/Routes';
import ActionButton from '../../../../../components/actionButton/ActionButton';
import { IconButton } from '@mui/material';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { selectVotesOfUser } from '../../../../vote/store/Vote.selectors';
import { deleteVoteThunk } from '../../../../vote/store/Vote.thunks';

export interface UserVotesPanelProps {
    userId: string
    mode: Mode
}

export const UserVotesPanel = ({ userId, mode }: UserVotesPanelProps) => {
    const dispatch = useAppDispatch()
    const votes = useAppSelector((state) => selectVotesOfUser(state, userId))
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

    const handleDelete = async (vote: Vote) => {
        await execute(async () => {
            await dispatch(deleteVoteThunk(vote.id)).unwrap()
        })
    }

    const getChipActions = (vote: Vote) => {
        return [
            <IconButton key="view" href={appVoteRoute(vote.id)} color='info' size='small' data-testid={`vote-${vote.id}-view-button`}>
                <VisibilityIcon fontSize='small' />
            </IconButton>,
            <ActionButton key="delete" buttonAction={() => handleDelete(vote)} color='error' size='small' disabled={!editMode || executing} data-testid={`vote-${vote.id}-delete-button`}>
                <ClearIcon fontSize='small' />
            </ActionButton>
        ]
    }

    return (
        <div className={classes.root}>
            <VotesList voteIds={votes.map(v => v.id)} chipActions={getChipActions}/>
        </div>
    )
}

export default UserVotesPanel;
