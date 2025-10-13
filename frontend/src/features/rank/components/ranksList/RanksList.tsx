import { HTMLAttributes, ReactNode } from 'react';
import { Rank } from '../../model/Rank.types';
import RankChip from '../rankChip/RankChip';
import EntityList from '../../../../components/entityList/EntityList';
import { useAppSelector } from '../../../../app/hooks';
import { selectRanksByIds } from '../../store/Rank.selectors';

export interface RanksListProps extends HTMLAttributes<HTMLDivElement> {
    rankIds: string[]
    rankUrl?: (rank: Rank) => string
    onRankClick?: (rank: Rank) => void
    chipActions?: (rank: Rank) => ReactNode[]
}

const RanksList = ({ rankIds, rankUrl, onRankClick, chipActions=()=>[], ...props }: RanksListProps) => {
    const ranks = useAppSelector(state => selectRanksByIds(state, rankIds))

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