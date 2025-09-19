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
    onDeleteTier: (tier: Tier) => Promise<void>
    onDeleteOption: (option: Option) => Promise<void>
    onDeleteVote: (vote: Vote) => Promise<void>
}

const RankCard = ({
    rank, tiers, options, votes, mode,
    onRankChange, onClear, onSave,
    onDelete, onDeleteTier, onDeleteOption, onDeleteVote,
    ...props
}: RankCardProps) => {
    const cardHeader = <RankCardHeader rank={rank}/>
    const cardContent = (
        <RankCardContent
            rank={rank} tiers={tiers} options={options} votes={votes} mode={mode}
            onRankChange={onRankChange} onDeleteTier={onDeleteTier} onDeleteOption={onDeleteOption} onDeleteVote={onDeleteVote}/>
    )
    const cardActions = <RankCardActions onClear={onClear} onSave={onSave} onDelete={onDelete} mode={mode}/>

    return <EntityCard cardHeader={cardHeader} cardContent={cardContent} cardActions={cardActions} {...props}/>
}

export default RankCard;