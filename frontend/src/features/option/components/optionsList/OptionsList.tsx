import React, { HTMLAttributes, ReactNode } from 'react';
import { Option } from '../../model/Option.types';
import OptionChip from '../optionChip/OptionChip';
import EntityList from '../../../../components/entityList/EntityList';

export interface OptionsListProps extends HTMLAttributes<HTMLDivElement> {
    options: Option[]
    optionUrl?: (option: Option) => string
    onOptionClick?: (option: Option) => void
    chipActions?: (option: Option) => ReactNode[]
}

const OptionsList = ({ options, optionUrl, onOptionClick, chipActions=()=>[], ...props }: OptionsListProps) => {
    return (
        <EntityList
            entities={options}
            entityRenderer={option => <OptionChip option={option}>{chipActions(option)}</OptionChip>}
            entityUrl={optionUrl}
            onEntityClick={onOptionClick}
            {...props}/>
    )
}

export default OptionsList;