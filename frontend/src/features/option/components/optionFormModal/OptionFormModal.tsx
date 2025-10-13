import { HTMLAttributes } from 'react';
import OptionCardHeader from '../optionCard/optionCardHeader/OptionCardHeader';
import OptionForm from '../optionForm/OptionForm';
import{ Mode } from '../../../../components/entityCard/EntityCard'
import EntityFormModal from '../../../../components/entityFormModal/EntityFormModal';
import OptionCreateIcon from '../optionCreateIcon/OptionCreateIcon';
import { useAppSelector } from '../../../../app/hooks';
import { selectOptionById } from '../../store/Option.selectors';

export interface OptionFormModalProps extends HTMLAttributes<HTMLDivElement> {
    optionId: string
    onCreate: () => Promise<void>
    onCancel: () => Promise<void>
}

const OptionFormModal = ({ optionId, onCreate, onCancel, ...props }: OptionFormModalProps) => {
    const option = useAppSelector((state) => optionId ? selectOptionById(state, optionId) : null)

    const modalHeader = option ? <OptionCardHeader optionId={option.id} showBreadcrumbs={false}/> : null
    const modalForm = optionId ? <OptionForm optionId={optionId} mode={Mode.EDIT}/> : null

    return (
        <EntityFormModal
            open
            modalHeader={modalHeader}
            modalForm={modalForm}
            entityCreateIcon={<OptionCreateIcon/>}
            onCancel={onCancel}
            onCreate={onCreate}
            {...props}/>
    );
}

export default OptionFormModal;