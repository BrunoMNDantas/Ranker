import React, { HTMLAttributes } from 'react';
import EntityChip from '../../../../components/entityChip/EntityChip';
import RankAvatar from '../rankAvatar/RankAvatar';
import { useAppSelector } from '../../../../app/hooks';
import { selectRankById } from '../../store/Rank.selectors';

export interface RankChipProps extends HTMLAttributes<HTMLDivElement> {
    rankId: string
}

const RankChip = ({ rankId, children, ...props }: RankChipProps) => {
    const rank = useAppSelector(state => selectRankById(state, rankId))

    if(!rank) {
        return null
    }

    const name = rank.title? rank.title : "-"
    return (
        <EntityChip
            name={name}
            description={rank.description}
            avatar={<RankAvatar rankId={rank.id}/>}
            {...props}>
            {children}
        </EntityChip>
    );
}

export default RankChip;