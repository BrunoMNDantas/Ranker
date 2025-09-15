import React, { HTMLAttributes } from 'react';
import { Vote } from '../../model/Vote.types';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';

export interface VoteAvatarProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
}

const VoteAvatar = ({ vote, ...props }: VoteAvatarProps) => {
    const imageUrl = '/vote.png'
    return <EntityAvatar imageUrl={imageUrl} avatarColor={null} {...props}/>;
}

export default VoteAvatar;