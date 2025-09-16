import React from 'react';
import TierChip from '../tierChip/TierChip';
import { TiersListProps } from '../tiersList/TiersList';
import EntityFilteredList from '../../../../components/entityFilteredList/EntityFilteredList';

const TiersFilteredList = ({ tiers, ...props }: TiersListProps) => {
    return <EntityFilteredList
        entities={tiers}
        entityRenderer={tier => <TierChip tier={tier}/>}
        entityUrl={props.tierUrl}
        onEntityClick={props.onTierClick}
        filter={text => {
            const lowerCaseText = text.toLowerCase()
            return tiers.filter(tier => tier.title?.toLowerCase().includes(lowerCaseText))
        }}
        {...props}/>
}

export default TiersFilteredList;