import React, { HTMLAttributes } from 'react';
import { Rank } from '../../model/Rank.types';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';

export interface RankAvatarProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
}

const RankAvatar = ({ rank, ...props }: RankAvatarProps) => {
    const imageUrl = rank.imageUrl ? rank.imageUrl : '/ranking.png'
    return <EntityAvatar imageUrl={imageUrl} {...props}/>;
}

export default RankAvatar;