import React from 'react';
import RanksList, { RanksListProps } from '../ranksList/RanksList';
import EntityFilteredList from '../../../../components/entityFilteredList/EntityFilteredList';
import { useAppSelector } from '../../../../app/hooks';
import { selectRanksByIds } from '../../store/Rank.selectors';

const RanksFilteredList = ({ rankIds, ...props }: RanksListProps) => {
    const ranks = useAppSelector(state => selectRanksByIds(state, rankIds))

    const handleFilter = (text: string) => {
        const lowerCaseText = text.toLowerCase()
        return ranks.filter(rank => rank.title?.toLowerCase().includes(lowerCaseText))
    }

    return (
        <EntityFilteredList onFilter={handleFilter}>
            <RanksList rankIds={ranks.map(r => r.id)} {...props}/>
        </EntityFilteredList>
    )
}

export default RanksFilteredList;