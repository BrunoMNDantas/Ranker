import React, { HTMLAttributes } from 'react';
import { Rank } from '../../model/Rank.types';
import EntityChip from '../../../../components/entityChip/EntityChip';
import RankAvatar from '../rankAvatar/RankAvatar';

export interface RankChipProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
}

const RankChip = ({ rank, children, ...props }: RankChipProps) => {
    const name = rank.title? rank.title : "-"
    return (
        <EntityChip
            name={name}
            description={rank.description}
            avatar={<RankAvatar rank={rank}/>}
            {...props}>
            {children}
        </EntityChip>
    );
}

export default RankChip;