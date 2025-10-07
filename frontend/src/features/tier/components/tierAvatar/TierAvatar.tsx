import React, { HTMLAttributes } from 'react';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';
import TierIcon from '../tierIcon/TierIcon';
import { useAppSelector } from '../../../../app/hooks';
import { selectTierById } from '../../store/Tier.selectors';

export interface TierAvatarProps extends HTMLAttributes<HTMLDivElement> {
    tierId: string
}

const TierAvatar = ({ tierId, ...props }: TierAvatarProps) => {
    const tier = useAppSelector(state => selectTierById(state, tierId))

    if(!tier) {
        return null
    }

    return (
        <EntityAvatar
            imageUrl={tier.imageUrl}
            Icon={TierIcon}
            avatarColor={tier.color}
            {...props}/>
    )
}

export default TierAvatar;