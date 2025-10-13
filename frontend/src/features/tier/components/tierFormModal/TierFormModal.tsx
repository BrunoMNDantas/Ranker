import { HTMLAttributes, useState, useEffect } from 'react';
import { Tier } from '../../model/Tier.types';
import TierCardHeader from '../tierCard/tierCardHeader/TierCardHeader';
import { createTier } from '../../../../services/EntityFactory.service';
import TierForm from '../tierForm/TierForm';
import{ Mode } from '../../../../components/entityCard/EntityCard'
import EntityFormModal from '../../../../components/entityFormModal/EntityFormModal';
import TierCreateIcon from '../tierCreateIcon/TierCreateIcon';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { addTier, deleteTier } from '../../store/Tier.slice';
import { selectTierById } from '../../store/Tier.selectors';

export interface TierFormModalProps extends HTMLAttributes<HTMLDivElement> {
    open: boolean
    defaultTier: Tier
    onCreate: (tier: Tier) => Promise<void>
    onCancel: () => Promise<void>
}

const TierFormModal = ({ open, defaultTier, onCreate, onCancel, ...props }: TierFormModalProps) => {
    const dispatch = useAppDispatch()
    const [tempTierId, setTempTierId] = useState<string>('')
    const tier = useAppSelector((state) => selectTierById(state, tempTierId))

    useEffect(() => {
        if (open) {
            const newTier = createTier(defaultTier)
            setTempTierId(newTier.id)
            dispatch(addTier(newTier))
        }
    }, [open, defaultTier, dispatch])

    const modalHeader = tier ? <TierCardHeader tier={tier} showBreadcrumbs={false}/> : null
    const modalForm = tempTierId ? <TierForm tierId={tempTierId} mode={Mode.EDIT}/> : null

    const handleCancel = async () => {
        if (tempTierId) {
            dispatch(deleteTier(tempTierId))
        }
        await onCancel()
        setTempTierId('')
    }

    const handleCreate = async () => {
        if (tier) {
            await onCreate(tier)
            dispatch(deleteTier(tier.id))
            setTempTierId('')
        }
    }

    return (
        <EntityFormModal
            open={open}
            modalHeader={modalHeader}
            modalForm={modalForm}
            entityCreateIcon={<TierCreateIcon/>}
            onCancel={handleCancel}
            onCreate={handleCreate}
            {...props}/>
    );
}

export default TierFormModal;