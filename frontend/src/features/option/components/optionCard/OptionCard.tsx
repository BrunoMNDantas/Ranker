import React, { HTMLAttributes } from 'react';
import { Option } from '../../model/Option.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import OptionCardHeader from './optionCardHeader/OptionCardHeader';
import OptionCardActions from './optionCardActions/OptionCardActions';
import OptionCardContent from './optionCardContent/OptionCardContent';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { Assignment } from '../../../assignment/model/Assignment.types';

export interface OptionCardProps extends HTMLAttributes<HTMLDivElement> {
    option: Option
    assignments: Assignment[]
    mode: Mode
    onOptionChange: (changedOption: Option) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
}

const OptionCard = ({ option, assignments, mode, onOptionChange, onClear, onSave, onDelete, ...props }: OptionCardProps) => {
    return (
        <EntityCard
            cardHeader={<OptionCardHeader option={option}/>}
            cardContent={<OptionCardContent option={option} assignments={assignments} onOptionChange={onOptionChange} mode={mode}/>}
            cardActions={<OptionCardActions onClear={onClear} onSave={onSave} onDelete={onDelete} mode={mode}/>}
            {...props}/>
    );
}

export default OptionCard;