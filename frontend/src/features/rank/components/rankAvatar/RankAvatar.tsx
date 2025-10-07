import React, { HTMLAttributes } from 'react';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';
import RankIcon from '../rankIcon/RankIcon';
import { useAppSelector } from '../../../../app/hooks';
import { selectRankById } from '../../store/Rank.selectors';

export interface RankAvatarProps extends HTMLAttributes<HTMLDivElement> {
    rankId: string
}

const RankAvatar = ({ rankId, ...props }: RankAvatarProps) => {
    const rank = useAppSelector(state => selectRankById(state, rankId))

    if(!rank) {
        return null
    }

    return (
        <EntityAvatar
            imageUrl={rank.imageUrl}
            Icon={RankIcon}
            avatarColor={rank.color}
            {...props}/>
    )
}

export default RankAvatar;