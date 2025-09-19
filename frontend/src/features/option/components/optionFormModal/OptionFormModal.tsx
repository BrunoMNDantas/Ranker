import React, { HTMLAttributes, useState } from 'react';
import { Option } from '../../model/Option.types';
import OptionCardHeader from '../optionCard/optionCardHeader/OptionCardHeader';
import { createOption } from '../../../../services/EntityFactory.service';
import OptionCardForm from '../optionCard/optionCardForm/OptionCardForm';
import{ Mode } from '../../../../components/entityCard/EntityCard'
import EntityFormModal from '../../../../components/entityFormModal/EntityFormModal';
import OptionIcon from '../optionIcon/OptionIcon';

export interface OptionFormModalProps extends HTMLAttributes<HTMLDivElement> {
    open: boolean
    defaultOption: Option
    onCreate: (option: Option) => Promise<void>
}

const OptionFormModal = ({ open, defaultOption, onCreate, ...props }: OptionFormModalProps) => {
    const [option, setOption] = useState(createOption(defaultOption))

    const modalHeader = <OptionCardHeader option={option} showBreadcrumbs={false}/>
    const modalForm = <OptionCardForm option={option} onOptionChange={setOption} mode={Mode.EDIT}/>

    return (
        <EntityFormModal
            open={open}
            modalHeader={modalHeader}
            modalForm={modalForm}
            entityIcon={<OptionIcon/>}
            onCreate={() => onCreate(option)}
            {...props}/>
    );
}

export default OptionFormModal;