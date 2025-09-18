import React, { HTMLAttributes } from 'react';
import { Rank } from '../../model/Rank.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import RankCardHeader from './rankCardHeader/RankCardHeader';
import RankCardActions from './rankCardActions/RankCardActions';
import RankCardContent from './rankCardContent/RankCardContent';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { Tier } from '../../../tier/model/Tier.types';
import { Option } from '../../../option/model/Option.types';
import { Vote } from '../../../vote/model/Vote.types';

export interface RankCardProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
    tiers: Tier[]
    options: Option[]
    votes: Vote[]
    mode: Mode
    onRankChange: (changedRank: Rank) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
}

const RankCard = ({ rank, tiers, options, votes, mode, onRankChange, onClear, onSave, onDelete, ...props }: RankCardProps) => {
    return (
        <EntityCard
            cardHeader={<RankCardHeader rank={rank}/>}
            cardContent={<RankCardContent rank={rank} tiers={tiers} options={options} votes={votes} onRankChange={onRankChange} mode={mode}/>}
            cardActions={<RankCardActions onClear={onClear} onSave={onSave} onDelete={onDelete} mode={mode}/>}
            {...props}/>
    );
}

export default RankCard;