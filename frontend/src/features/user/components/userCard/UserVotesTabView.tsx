import React from 'react';
import { Vote } from '../../../vote/model/Vote.types';
import VotesList from '../../../vote/components/votesList/VotesList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appVoteRoute } from '../../../../app/Routes';
import ActionButton from '../../../../components/actionButton/ActionButton';
import { IconButton } from '@mui/material';

export interface UserVotesTabViewProps {
    votes: Vote[]
    editMode: boolean
    onDeleteVote: (vote: Vote) => Promise<void>
}

export const UserVotesTabView = ({ votes, editMode, onDeleteVote }: UserVotesTabViewProps) => {
    const handleDelete = async (vote: Vote) => {
        await onDeleteVote(vote)
    }

    const getChipActions = (vote: Vote) => {
        return [
            <IconButton href={appVoteRoute(vote.id)} color='info' size='small'>
                <VisibilityIcon fontSize='small' />
            </IconButton>,
            <ActionButton buttonAction={e => handleDelete(vote)} color='error' size='small' disabled={!editMode}>
                <ClearIcon fontSize='small' />
            </ActionButton>
        ]
    }

    return <VotesList voteIds={votes.map(v => v.id)} chipActions={getChipActions}/>
}

export default UserVotesTabView;