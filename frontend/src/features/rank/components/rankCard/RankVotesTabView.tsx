import React from 'react';
import { Vote } from '../../../vote/model/Vote.types';
import VotesList from '../../../vote/components/votesList/VotesList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appVoteRoute } from '../../../../app/Routes';
import ActionButton from '../../../../components/actionButton/ActionButton';
import { IconButton } from '@mui/material';

export interface RankVotesTabViewProps {
    votes: Vote[]
    editMode: boolean
    onDeleteVote: (vote: Vote) => Promise<void>
}

export const RankVotesTabView = ({ votes, editMode, onDeleteVote }: RankVotesTabViewProps) => {
    const handleDelete = async (e: React.MouseEvent, vote: Vote) => {
        e.preventDefault()
        await onDeleteVote(vote)
    }

    return (
        <VotesList
            votes={votes}
            chipActions={vote => [
                <IconButton href={appVoteRoute(vote.id!)} color='info' size='small'>
                    <VisibilityIcon fontSize='small' />
                </IconButton>,
                editMode ?
                    <ActionButton buttonAction={e => handleDelete(e, vote)} color='error' size='small'>
                        <ClearIcon fontSize='small' />
                    </ActionButton> :
                    null
            ]} />
    )
}

export default RankVotesTabView;