import React from 'react';
import RanksList, { RanksListProps } from '../ranksList/RanksList';
import EntityFilteredList from '../../../../components/entityFilteredList/EntityFilteredList';

const RanksFilteredList = ({ ranks, chipActions=()=>[], ...props }: RanksListProps) => {
    const handleFilter = (text: string) => {
        const lowerCaseText = text.toLowerCase()
        return ranks.filter(rank => rank.title?.toLowerCase().includes(lowerCaseText))
    }

    return (
        <EntityFilteredList onFilter={handleFilter}>
            <RanksList ranks={ranks} {...props}/>
        </EntityFilteredList>
    )
}

export default RanksFilteredList;