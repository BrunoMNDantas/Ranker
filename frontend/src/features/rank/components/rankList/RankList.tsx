import React, { HTMLAttributes } from 'react';
import { Rank } from '../../model/Rank.types';
import RankChip from '../rankChip/RankChip';
import EntityList from '../../../../components/entityList/EntityList';

export interface RankListProps extends HTMLAttributes<HTMLDivElement> {
    ranks: Rank[]
    rankUrl?: (rank: Rank) => string
    onRankClick?: (rank: Rank) => void
}

const RankList = ({ ranks, rankUrl, onRankClick, ...props }: RankListProps) => {
    return <EntityList
        entities={ranks}
        entityRenderer={rank => <RankChip rank={rank}/>}
        entityUrl={rankUrl}
        onEntityClick={onRankClick}
        {...props}/>
}

export default RankList;