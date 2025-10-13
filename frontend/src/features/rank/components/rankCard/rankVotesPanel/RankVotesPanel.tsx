import { useState } from 'react';
import classes from './RankVotesPanel.module.css'
import { Vote } from '../../../../vote/model/Vote.types';
import VotesList from '../../../../vote/components/votesList/VotesList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appVoteRoute, appRankVoteRoute } from '../../../../../app/Routes';
import ActionButton from '../../../../../components/actionButton/ActionButton';
import { IconButton, Divider } from '@mui/material';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import EntityCardActions, { Action } from '../../../../../components/entityCard/entityCardActions/EntityCardActions';
import VoteCreateIcon from '../../../../vote/components/voteCreateIcon/VoteCreateIcon';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { selectVotesOfRank } from '../../../../vote/store/Vote.selectors';
import { deleteVoteThunk } from '../../../../vote/store/Vote.thunks';
import { useNavigate } from 'react-router-dom';

export interface RankVotesPanelProps {
    rankId: string
    mode: Mode
}

export const RankVotesPanel = ({ rankId, mode }: RankVotesPanelProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const votes = useAppSelector((state) => selectVotesOfRank(state, rankId))
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

    const handleCreateVote = async () => {
        navigate(appRankVoteRoute(rankId))
    }

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
            <ActionButton buttonAction={() => handleDelete(vote)} color='error' size='small' disabled={!editMode || executing}>
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
