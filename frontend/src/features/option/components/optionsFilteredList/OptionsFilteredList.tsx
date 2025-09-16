import React from 'react';
import OptionChip from '../optionChip/OptionChip';
import { OptionsListProps } from '../optionsList/OptionsList';
import EntityFilteredList from '../../../../components/entityFilteredList/EntityFilteredList';

const OptionsFilteredList = ({ options, ...props }: OptionsListProps) => {
    return <EntityFilteredList
        entities={options}
        entityRenderer={option => <OptionChip option={option}/>}
        entityUrl={props.optionUrl}
        onEntityClick={props.onOptionClick}
        filter={text => {
            const lowerCaseText = text.toLowerCase()
            return options.filter(option => option.title?.toLowerCase().includes(lowerCaseText))
        }}
        {...props}/>
}

export default OptionsFilteredList;