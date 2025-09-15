import React, { HTMLAttributes } from 'react';
import { Rank } from '../../model/Rank.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import RankCardHeader from './rankCardHeader/RankCardHeader';
import RankCardActions from './rankCardActions/RankCardActions';
import RankCardContent from './rankCardContent/RankCardContent';
import { Mode } from '../../../../components/entityCard/EntityCard';

export interface RankCardProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
    mode: Mode
    onRankChange: (changedRank: Rank) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
}

const RankCard = ({ rank, mode, onRankChange, onClear, onSave, onDelete, ...props }: RankCardProps) => {
    return (
        <EntityCard
            cardHeader={<RankCardHeader rank={rank}/>}
            cardContent={<RankCardContent rank={rank} onRankChange={onRankChange} mode={mode}/>}
            cardActions={<RankCardActions onClear={onClear} onSave={onSave} onDelete={onDelete} mode={mode}/>}
            {...props}/>
    );
}

export default RankCard;