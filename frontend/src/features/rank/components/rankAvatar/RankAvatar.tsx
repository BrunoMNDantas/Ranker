import React, { HTMLAttributes } from 'react';
import { Rank } from '../../model/Rank.types';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export interface RankAvatarProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
}

const RankAvatar = ({ rank, ...props }: RankAvatarProps) => {
    return (
        <EntityAvatar
            imageUrl={rank.imageUrl}
            Icon={EmojiEventsIcon}
            avatarColor={rank.color}
            {...props}/>
    )
}

export default RankAvatar;