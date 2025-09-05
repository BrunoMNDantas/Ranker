import React, { HTMLAttributes, useState } from 'react';
import { Option } from '../../model/Option.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import { deleteOption, updateOption } from '../../api/Option.api';
import OptionCardHeader from './optionCardHeader/OptionCardHeader';
import OptionCardActions from './optionCardActions/OptionCardActions';
import OptionCardContent from './optionCardContent/OptionCardContent';

export interface OptionCardProps extends HTMLAttributes<HTMLDivElement> {
    option: Option
}

const OptionCard = ({ option, ...props }: OptionCardProps) => {
    const [editedOption, setEditedOption] = useState(structuredClone(option))

    const handleChange = (changedOption: Option) => {
        setEditedOption(changedOption)
    }

    const handleClear = () => {
        setEditedOption(structuredClone(option))
        return Promise.resolve()
    }

    const handleSave = () => {
        return updateOption(editedOption)
    }

    const handleDelete = () => {
        return deleteOption(option.id!)
    }

    return (
        <EntityCard
            cardHeader={<OptionCardHeader option={editedOption}/>}
            cardContent={<OptionCardContent option={editedOption} onOptionChange={handleChange}/>}
            cardActions={<OptionCardActions option={editedOption} onClear={handleClear} onSave={handleSave} onDelete={handleDelete}/>}
            {...props}/>
    );
}

export default OptionCard;