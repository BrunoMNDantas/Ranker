import React from 'react';
import OptionsList, { OptionsListProps } from '../optionsList/OptionsList';
import EntityFilteredList from '../../../../components/entityFilteredList/EntityFilteredList';
import { useAppSelector } from '../../../../app/hooks';
import { selectOptionsByIds } from '../../store/Option.selectors';

const OptionsFilteredList = ({ optionIds, ...props }: OptionsListProps) => {
    const options = useAppSelector(state => selectOptionsByIds(state, optionIds))

    const handleFilter = (text: string) => {
        const lowerCaseText = text.toLowerCase()
        return options.filter(option => option.title?.toLowerCase().includes(lowerCaseText))
    }

    return (
        <EntityFilteredList onFilter={handleFilter}>
            <OptionsList optionIds={options.map(o => o.id)} {...props}/>
        </EntityFilteredList>
    )
}

export default OptionsFilteredList;