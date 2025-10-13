import { useMemo, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { selectTiersOfRank } from '../../../../tier/store/Tier.selectors';
import { createTierThunk, updateTierThunk, deleteTierThunk } from '../../../../tier/store/Tier.thunks';
import { addTier, deleteTier } from '../../../../tier/store/Tier.slice';
import TierFormModal from '../../../../tier/components/tierFormModal/TierFormModal';
import { createTier } from '../../../../../services/EntityFactory.service';

export interface RankTiersPanelProps {
    rankId: string
    mode: Mode
}

export const RankTiersPanel = ({ rankId, mode }: RankTiersPanelProps) => {
    const dispatch = useAppDispatch()
    const tiers = useAppSelector((state) => selectTiersOfRank(state, rankId))
    const [executing, setExecuting] = useState(false)
    const [tempTierId, setTempTierId] = useState<string | null>(null)
    const editMode = mode === Mode.EDIT

    const sortedTiers = useMemo(() =>
        [...tiers].sort((a, b) => a.order - b.order),
        [tiers]
    )

    const execute = async (action: ()=>Promise<void>) => {
        setExecuting(true)
        try {
            return await action()
        } finally {
            return setExecuting(false)
        }
    }

    const handleDelete = async (tier: Tier) => {
        await execute(async () => {
            await dispatch(deleteTierThunk(tier.id)).unwrap()
        })
    }

    const handleTiersChange = async (updatedTiers: Tier[]) => {
        await execute(async () => {
            const tiersWithNewOrder = updatedTiers.map((tier, index) => ({ ...tier, order: index }))
            await Promise.all(tiersWithNewOrder.map(tier => dispatch(updateTierThunk(tier)).unwrap()))
        })
    }

    const handleCreateTierClick = async () => {
        await execute(async () => {
            const newTier = createTier({ id: crypto.randomUUID(), rankId, order: tiers.length })
            setTempTierId(newTier.id)
            dispatch(addTier(newTier))
        })
    }

    const handleModalCreate = async () => {
        if (tempTierId) {
            const tier = tiers.find(t => t.id === tempTierId)
            if (tier) {
                await execute(async () => {
                    await dispatch(createTierThunk(tier)).unwrap()
                    setTempTierId(null)
                })
            }
        }
    }

    const handleModalCancel = async () => {
        if (tempTierId) {
            dispatch(deleteTier(tempTierId))
            setTempTierId(null)
        }
    }

    const createTierAction: Action = {
        iconProps: { color: "info" },
        icon: <TierCreateIcon/>,
        onClick: handleCreateTierClick,
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
                        <ActionButton buttonAction={() => handleDelete(tier)} color='error' size='small' disabled={!editMode || executing}>
                            <ClearIcon fontSize='small' />
                        </ActionButton>
                    </TierChip>
                )}/>
            <Divider/>
            <EntityCardActions actions={[createTierAction]}/>
            { tempTierId ? <TierFormModal tierId={tempTierId} onCancel={handleModalCancel} onCreate={handleModalCreate}/> : null }
        </div>
    )
}

export default RankTiersPanel;
