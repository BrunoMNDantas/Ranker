import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appRankRoute } from '../../../../app/Routes';
import ActionButton from '../../../../components/actionButton/ActionButton';
import { IconButton } from '@mui/material';
import { Rank } from '../../../rank/model/Rank.types';
import RanksList from '../../../rank/components/ranksList/RanksList';

export interface UserRanksTabViewProps {
    ranks: Rank[]
    editMode: boolean
    onDeleteRank: (rank: Rank) => Promise<void>
}

export const UserRanksTabView = ({ ranks, editMode, onDeleteRank }: UserRanksTabViewProps) => {
    const handleDelete = async (rank: Rank) => {
        await onDeleteRank(rank)
    }

    const getChipActions = (rank: Rank) => {
        return [
            <IconButton href={appRankRoute(rank.id)} color='info' size='small'>
                <VisibilityIcon fontSize='small' />
            </IconButton>,
            <ActionButton buttonAction={e => handleDelete(rank)} color='error' size='small' disabled={!editMode}>
                <ClearIcon fontSize='small' />
            </ActionButton>
        ]
    }

    return <RanksList rankIds={ranks.map(r => r.id)} chipActions={getChipActions}/>
}

export default UserRanksTabView;