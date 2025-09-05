import React, { HTMLAttributes } from 'react';
import { Rank } from '../../model/Rank.types';
import EntityChip from '../../../../components/entityChip/EntityChip';
import RankAvatar from '../rankAvatar/RankAvatar';

export interface RankChipProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
}

const RankChip = ({ rank, ...props }: RankChipProps) => {
    const name = rank.title? rank.title : "-"
    return (
        <EntityChip name={name} description={rank.description} {...props}>
            <RankAvatar rank={rank}/>
        </EntityChip>
    );
}

export default RankChip;