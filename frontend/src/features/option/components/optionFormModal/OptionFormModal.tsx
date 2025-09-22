import React, { HTMLAttributes, useState } from 'react';
import { Option } from '../../model/Option.types';
import OptionCardHeader from '../optionCard/optionCardHeader/OptionCardHeader';
import { createOption } from '../../../../services/EntityFactory.service';
import OptionCardForm from '../optionCard/optionCardForm/OptionCardForm';
import{ Mode } from '../../../../components/entityCard/EntityCard'
import EntityFormModal from '../../../../components/entityFormModal/EntityFormModal';
import OptionCreateIcon from '../optionCreateIcon/OptionCreateIcon';

export interface OptionFormModalProps extends HTMLAttributes<HTMLDivElement> {
    open: boolean
    defaultOption: Option
    onCreate: (option: Option) => Promise<void>
    onCancel: () => Promise<void>
}

const OptionFormModal = ({ open, defaultOption, onCreate, onCancel, ...props }: OptionFormModalProps) => {
    const [option, setOption] = useState(createOption(defaultOption))

    const modalHeader = <OptionCardHeader option={option} showBreadcrumbs={false}/>
    const modalForm = <OptionCardForm option={option} onOptionChange={setOption} mode={Mode.EDIT}/>

    const handleCancel = async () => {
        await onCancel()
        setOption(defaultOption)
    }

    const handleCreate = async () => {
        await onCreate(option)
        setOption(defaultOption)
    }

    return (
        <EntityFormModal
            open={open}
            modalHeader={modalHeader}
            modalForm={modalForm}
            entityCreateIcon={<OptionCreateIcon/>}
            onCancel={handleCancel}
            onCreate={handleCreate}
            {...props}/>
    );
}

export default OptionFormModal;