import React, { HTMLAttributes, ReactNode } from 'react';
import { Rank } from '../../model/Rank.types';
import RankChip from '../rankChip/RankChip';
import EntityList from '../../../../components/entityList/EntityList';

export interface RanksListProps extends HTMLAttributes<HTMLDivElement> {
    ranks: Rank[]
    rankUrl?: (rank: Rank) => string
    onRankClick?: (rank: Rank) => void
    chipActions?: (rank: Rank) => ReactNode[]
}

const RanksList = ({ ranks, rankUrl, onRankClick, chipActions=()=>[], ...props }: RanksListProps) => {
    return (
        <EntityList
            entities={ranks}
            entityRenderer={rank => <RankChip rankId={rank.id}>{chipActions(rank)}</RankChip>}
            entityUrl={rankUrl}
            onEntityClick={onRankClick}
            {...props}/>
    )
}

export default RanksList;