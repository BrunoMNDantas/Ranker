import React, { useState } from 'react';
import { Tier } from '../../../tier/model/Tier.types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appTierRoute } from '../../../../app/Routes';
import ActionButton from '../../../../components/actionButton/ActionButton';
import { IconButton } from '@mui/material';
import EntitySortableList from '../../../../components/entitySortableList/EntitySortableList';
import TierChip from '../../../tier/components/tierChip/TierChip';

export interface RankTiersTabViewProps {
    tiers: Tier[]
    onTiersChange: (tiers: Tier[]) => void
    editMode: boolean
    onDeleteTier: (tier: Tier) => Promise<void>
}

export const RankTiersTabView = ({ tiers, onTiersChange, editMode, onDeleteTier }: RankTiersTabViewProps) => {
    const [sortedTiers, setSortedTiers] = useState(tiers.sort((a, b) => a.order - b.order))

    const handleDelete = async (e: React.MouseEvent, tier: Tier) => {
        e.preventDefault()
        await onDeleteTier(tier)
    }

    const handleTiersChange = (tiers: Tier[]) => {
        tiers.forEach((tier, index) => tier.order = index)
        setSortedTiers(tiers)
        onTiersChange(tiers)
    }

    return (
         <EntitySortableList
            entities={sortedTiers}
            onEntitiesChange={handleTiersChange}
            entityRenderer={tier => (
                <TierChip tier={tier}>
                    <IconButton href={appTierRoute(tier.id)} color='info' size='small'>
                        <VisibilityIcon fontSize='small' />
                    </IconButton>
                    <ActionButton buttonAction={e => handleDelete(e, tier)} color='error' size='small' disabled={!editMode}>
                        <ClearIcon fontSize='small' />
                    </ActionButton>
                </TierChip>
            )}/>
    )
}

export default RankTiersTabView;