import { HTMLAttributes } from 'react';
import TierCardHeader from '../tierCard/tierCardHeader/TierCardHeader';
import TierForm from '../tierForm/TierForm';
import{ Mode } from '../../../../components/entityCard/EntityCard'
import EntityFormModal from '../../../../components/entityFormModal/EntityFormModal';
import TierCreateIcon from '../tierCreateIcon/TierCreateIcon';
import { useAppSelector } from '../../../../app/hooks';
import { selectTierById } from '../../store/Tier.selectors';

export interface TierFormModalProps extends HTMLAttributes<HTMLDivElement> {
    tierId: string
    onCreate: () => Promise<void>
    onCancel: () => Promise<void>
}

const TierFormModal = ({ tierId, onCreate, onCancel, ...props }: TierFormModalProps) => {
    const tier = useAppSelector((state) => tierId ? selectTierById(state, tierId) : null)

    const modalHeader = tier ? <TierCardHeader tierId={tier.id} showBreadcrumbs={false}/> : null
    const modalForm = tierId ? <TierForm tierId={tierId} mode={Mode.EDIT}/> : null

    return (
        <EntityFormModal
            open
            modalHeader={modalHeader}
            modalForm={modalForm}
            entityCreateIcon={<TierCreateIcon/>}
            onCancel={onCancel}
            onCreate={onCreate}
            {...props}/>
    );
}

export default TierFormModal;