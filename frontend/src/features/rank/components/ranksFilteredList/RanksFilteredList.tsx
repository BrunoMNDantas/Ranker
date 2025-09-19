import React from 'react';
import RankChip from '../rankChip/RankChip';
import { RanksListProps } from '../ranksList/RanksList';
import EntityFilteredList from '../../../../components/entityFilteredList/EntityFilteredList';

const RanksFilteredList = ({ ranks, chipActions=()=>[], ...props }: RanksListProps) => {
    const filter = (text: string) => {
        const lowerCaseText = text.toLowerCase()
        return ranks.filter(rank => rank.title?.toLowerCase().includes(lowerCaseText))
    }

    return (
        <EntityFilteredList
            entities={ranks}
            entityRenderer={rank => <RankChip rank={rank}>{chipActions(rank)}</RankChip>}
            entityUrl={props.rankUrl}
            onEntityClick={props.onRankClick}
            filter={filter}
            {...props}/>
    )
}

export default RanksFilteredList;