import React, { HTMLAttributes } from 'react';
import { Tier } from '../../model/Tier.types';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';

export interface TierAvatarProps extends HTMLAttributes<HTMLDivElement> {
    tier: Tier
}

const TierAvatar = ({ tier, ...props }: TierAvatarProps) => {
    const imageUrl = tier.imageUrl ? tier.imageUrl : '/list.png'
    return <EntityAvatar imageUrl={imageUrl} {...props}/>;
}

export default TierAvatar;