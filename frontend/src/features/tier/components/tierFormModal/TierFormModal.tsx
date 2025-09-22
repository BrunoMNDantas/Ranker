import React, { HTMLAttributes, useState } from 'react';
import { Tier } from '../../model/Tier.types';
import TierCardHeader from '../tierCard/tierCardHeader/TierCardHeader';
import { createTier } from '../../../../services/EntityFactory.service';
import TierCardForm from '../tierCard/tierCardForm/TierCardForm';
import{ Mode } from '../../../../components/entityCard/EntityCard'
import EntityFormModal from '../../../../components/entityFormModal/EntityFormModal';
import TierCreateIcon from '../tierCreateIcon/TierCreateIcon';

export interface TierFormModalProps extends HTMLAttributes<HTMLDivElement> {
    open: boolean
    defaultTier: Tier
    onCreate: (tier: Tier) => Promise<void>
    onCancel: () => Promise<void>
}

const TierFormModal = ({ open, defaultTier, onCreate, onCancel, ...props }: TierFormModalProps) => {
    const [tier, setTier] = useState(createTier(defaultTier))

    const modalHeader = <TierCardHeader tier={tier} showBreadcrumbs={false}/>
    const modalForm = <TierCardForm tier={tier} onTierChange={setTier} mode={Mode.EDIT}/>

    const handleCancel = async () => {
        await onCancel()
        setTier(defaultTier)
    }

    const handleCreate = async () => {
        await onCreate(tier)
        setTier(defaultTier)
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