import React, { useState } from 'react';
import classes from './RankTiersPanel.module.css'
import { Tier } from '../../../../tier/model/Tier.types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appTierRoute } from '../../../../../app/Routes';
import ActionButton from '../../../../../components/actionButton/ActionButton';
import { IconButton, Divider } from '@mui/material';
import EntitySortableList from '../../../../../components/entitySortableList/EntitySortableList';
import TierChip from '../../../../tier/components/tierChip/TierChip';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import EntityCardActions, { Action } from '../../../../../components/entityCard/entityCardActions/EntityCardActions';
import TierCreateIcon from '../../../../tier/components/tierCreateIcon/TierCreateIcon';

export interface RankTiersPanelProps {
    tiers: Tier[]
    mode: Mode
    onTiersChange: (tiers: Tier[]) => void
    onDeleteTier: (tier: Tier) => Promise<void>
    onCreateTier: () => Promise<void>
}

export const RankTiersPanel = ({ tiers, mode, onTiersChange, onDeleteTier, onCreateTier }: RankTiersPanelProps) => {
    const [sortedTiers, setSortedTiers] = useState(tiers.sort((a, b) => a.order - b.order))
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

    const handleDelete = async (tier: Tier) => {
        await onDeleteTier(tier)
    }

    const handleTiersChange = (tiers: Tier[]) => {
        tiers.forEach((tier, index) => tier.order = index)
        setSortedTiers(tiers)
        onTiersChange(tiers)
    }

    const handleCreateTier = () => execute(onCreateTier)

    const createTierAction: Action = {
        iconProps: { color: "info" },
        icon: <TierCreateIcon/>,
        onClick: handleCreateTier,
        disabled: executing || !editMode
    }

    return (
        <div className={classes.root}>
            <EntitySortableList
                disabled={!editMode}
                entities={sortedTiers}
                onEntitiesChange={handleTiersChange}
                entityRenderer={tier => (
                    <TierChip tierId={tier.id}>
                        <IconButton href={appTierRoute(tier.id)} color='info' size='small'>
                            <VisibilityIcon fontSize='small' />
                        </IconButton>
                        <ActionButton buttonAction={e => handleDelete(tier)} color='error' size='small' disabled={!editMode}>
                            <ClearIcon fontSize='small' />
                        </ActionButton>
                    </TierChip>
                )}/>
            <Divider/>
            <EntityCardActions actions={[createTierAction]}/>
        </div>
    )
}

export default RankTiersPanel;
