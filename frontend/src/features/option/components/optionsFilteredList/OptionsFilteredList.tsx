import React from 'react';
import OptionsList, { OptionsListProps } from '../optionsList/OptionsList';
import EntityFilteredList from '../../../../components/entityFilteredList/EntityFilteredList';

const OptionsFilteredList = ({ options, ...props }: OptionsListProps) => {
    const handleFilter = (text: string) => {
        const lowerCaseText = text.toLowerCase()
        return options.filter(option => option.title?.toLowerCase().includes(lowerCaseText))
    }

    return (
        <EntityFilteredList onFilter={handleFilter}>
            <OptionsList options={options} {...props}/>
        </EntityFilteredList>
    )
}

export default OptionsFilteredList;