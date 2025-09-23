import React from 'react';
import TiersList, { TiersListProps } from '../tiersList/TiersList';
import EntityFilteredList from '../../../../components/entityFilteredList/EntityFilteredList';

const TiersFilteredList = ({ tiers, chipActions=()=>[], ...props }: TiersListProps) => {
    const handleFilter = (text: string) => {
        const lowerCaseText = text.toLowerCase()
        return tiers.filter(tier => tier.title?.toLowerCase().includes(lowerCaseText))
    }

    return (
        <EntityFilteredList onFilter={handleFilter}>
            <TiersList tiers={tiers} {...props}/>
        </EntityFilteredList>
    )
}

export default TiersFilteredList;