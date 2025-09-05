import React, { HTMLAttributes } from 'react';
import { Tier } from '../../../model/Tier.types';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import TierAvatar from '../../tierAvatar/TierAvatar';

export interface TierCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    tier: Tier
}

const TierCardHeader = ({ tier, ...props }: TierCardHeaderProps) => {
    return (
        <EntityCardHeader
            avatar={<TierAvatar tier={tier}/>}
            name={tier.title!}
            creationDate={tier.creationDate!}
            {...props}/>
    );
}

export default TierCardHeader;