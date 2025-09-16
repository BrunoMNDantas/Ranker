import React from 'react';
import RankChip from '../rankChip/RankChip';
import { RanksListProps } from '../ranksList/RanksList';
import EntityFilteredList from '../../../../components/entityFilteredList/EntityFilteredList';

const RanksFilteredList = ({ ranks, ...props }: RanksListProps) => {
    return <EntityFilteredList
        entities={ranks}
        entityRenderer={rank => <RankChip rank={rank}/>}
        entityUrl={props.rankUrl}
        onEntityClick={props.onRankClick}
        filter={text => {
            const lowerCaseText = text.toLowerCase()
            return ranks.filter(rank => rank.title?.toLowerCase().includes(lowerCaseText))
        }}
        {...props}/>
}

export default RanksFilteredList;