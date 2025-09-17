import React, { HTMLAttributes } from 'react';
import { Rank } from '../../model/Rank.types';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';
import RankIcon from '../rankIcon/RankIcon';

export interface RankAvatarProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
}

const RankAvatar = ({ rank, ...props }: RankAvatarProps) => {
    return (
        <EntityAvatar
            imageUrl={rank.imageUrl}
            Icon={RankIcon}
            avatarColor={rank.color}
            {...props}/>
    )
}

export default RankAvatar;