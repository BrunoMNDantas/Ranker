import React from 'react';
import { Tier } from '../../../tier/model/Tier.types';
import TiersFilteredList from '../../../tier/components/tiersFilteredList/TiersFilteredList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appTierRoute } from '../../../../app/Routes';
import ActionButton from '../../../../components/actionButton/ActionButton';
import { IconButton } from '@mui/material';

export interface RankTiersTabViewProps {
    tiers: Tier[]
    editMode: boolean
    onDeleteTier: (tier: Tier) => Promise<void>
}

export const RankTiersTabView = ({ tiers, editMode, onDeleteTier }: RankTiersTabViewProps) => {
    const sortedTiers = tiers.sort((a, b) => a.order! - b.order!)

    const handleDelete = async (e: React.MouseEvent, tier: Tier) => {
        e.preventDefault()
        await onDeleteTier(tier)
    }

    return (
        <TiersFilteredList
            tiers={sortedTiers}
            chipActions={tier => [
                <IconButton href={appTierRoute(tier.id!)} color='info' size='small'>
                    <VisibilityIcon fontSize='small' />
                </IconButton>,
                editMode ?
                    <ActionButton buttonAction={e => handleDelete(e, tier)} color='error' size='small'>
                        <ClearIcon fontSize='small' />
                    </ActionButton> :
                    null
            ]} />
    )
}

export default RankTiersTabView;