import React, { HTMLAttributes } from 'react';
import { Tier } from '../../model/Tier.types';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';
import TierIcon from '../tierIcon/TierIcon';

export interface TierAvatarProps extends HTMLAttributes<HTMLDivElement> {
    tier: Tier
}

const TierAvatar = ({ tier, ...props }: TierAvatarProps) => {
    return (
        <EntityAvatar
            imageUrl={tier.imageUrl}
            Icon={TierIcon}
            avatarColor={tier.color}
            {...props}/>
    )
}

export default TierAvatar;