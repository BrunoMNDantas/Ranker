import React, { useState } from 'react';
import classes from './RankVotesPanel.module.css'
import { Vote } from '../../../../vote/model/Vote.types';
import VotesList from '../../../../vote/components/votesList/VotesList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appVoteRoute } from '../../../../../app/Routes';
import ActionButton from '../../../../../components/actionButton/ActionButton';
import { IconButton, Divider } from '@mui/material';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import EntityCardActions, { Action } from '../../../../../components/entityCard/entityCardActions/EntityCardActions';
import VoteCreateIcon from '../../../../vote/components/voteCreateIcon/VoteCreateIcon';

export interface RankVotesPanelProps {
    votes: Vote[]
    mode: Mode
    onDeleteVote: (vote: Vote) => Promise<void>
    onCreateVote: () => Promise<void>
}

export const RankVotesPanel = ({ votes, mode, onDeleteVote, onCreateVote }: RankVotesPanelProps) => {
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
        await onDeleteVote(vote)
    }

    const handleCreateVote = () => execute(onCreateVote)

    const createVoteAction: Action = {
        iconProps: { color: "info" },
        icon: <VoteCreateIcon/>,
        onClick: handleCreateVote,
        disabled: executing || !editMode
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

    return (
        <div className={classes.root}>
            <VotesList voteIds={votes.map(v => v.id)} chipActions={getChipActions}/>
            <Divider/>
            <EntityCardActions actions={[createVoteAction]}/>
        </div>
    )
}

export default RankVotesPanel;
