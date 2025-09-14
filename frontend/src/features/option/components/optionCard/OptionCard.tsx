import React, { HTMLAttributes, useState } from 'react';
import { Option } from '../../model/Option.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import { deleteOption, updateOption } from '../../api/Option.api';
import OptionCardHeader from './optionCardHeader/OptionCardHeader';
import OptionCardActions from './optionCardActions/OptionCardActions';
import OptionCardContent from './optionCardContent/OptionCardContent';
import { Mode } from '../../../../components/entityCard/EntityCard';

export interface OptionCardProps extends HTMLAttributes<HTMLDivElement> {
    option: Option
    mode: Mode
}

const OptionCard = ({ option, mode, ...props }: OptionCardProps) => {
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
            cardContent={<OptionCardContent option={editedOption} onOptionChange={handleChange} mode={mode}/>}
            cardActions={<OptionCardActions option={editedOption} onClear={handleClear} onSave={handleSave} onDelete={handleDelete} mode={mode}/>}
            {...props}/>
    );
}

export default OptionCard;