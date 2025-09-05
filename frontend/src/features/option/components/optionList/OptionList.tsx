import React, { HTMLAttributes } from 'react';
import { Option } from '../../model/Option.types';
import OptionChip from '../optionChip/OptionChip';
import EntityList from '../../../../components/entityList/EntityList';

export interface OptionListProps extends HTMLAttributes<HTMLDivElement> {
    options: Option[]
    optionUrl?: (option: Option) => string
    onOptionClick?: (option: Option) => void
}

const OptionList = ({ options, optionUrl, onOptionClick, ...props }: OptionListProps) => {
    return <EntityList
    entities={options}
    entityRenderer={option => <OptionChip option={option}/>}
    entityUrl={optionUrl}
    onEntityClick={onOptionClick}
    {...props}/>
}

export default OptionList;