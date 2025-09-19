import React from 'react';
import TierChip from '../tierChip/TierChip';
import { TiersListProps } from '../tiersList/TiersList';
import EntityFilteredList from '../../../../components/entityFilteredList/EntityFilteredList';

const TiersFilteredList = ({ tiers, chipActions=()=>[], ...props }: TiersListProps) => {
    const filter = (text: string) => {
        const lowerCaseText = text.toLowerCase()
        return tiers.filter(tier => tier.title?.toLowerCase().includes(lowerCaseText))
    }

    return (
        <EntityFilteredList
            entities={tiers}
            entityRenderer={tier => <TierChip tier={tier}>{chipActions(tier)}</TierChip>}
            entityUrl={props.tierUrl}
            onEntityClick={props.onTierClick}
            filter={filter}
            {...props}/>
    )
}

export default TiersFilteredList;