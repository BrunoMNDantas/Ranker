import React from 'react';
import OptionChip from '../optionChip/OptionChip';
import { OptionsListProps } from '../optionsList/OptionsList';
import EntityFilteredList from '../../../../components/entityFilteredList/EntityFilteredList';

const OptionsFilteredList = ({ options, chipActions=()=>[], ...props }: OptionsListProps) => {
    const filter = (text: string) => {
        const lowerCaseText = text.toLowerCase()
        return options.filter(option => option.title?.toLowerCase().includes(lowerCaseText))
    }

    return (
        <EntityFilteredList
            entities={options}
            entityRenderer={option => <OptionChip option={option}>{chipActions(option)}</OptionChip>}
            entityUrl={props.optionUrl}
            onEntityClick={props.onOptionClick}
            filter={filter}
            {...props}/>
    )
}

export default OptionsFilteredList;