import React, { HTMLAttributes } from 'react';
import { Tier } from '../../model/Tier.types';
import EntityChip from '../../../../components/entityChip/EntityChip';
import TierAvatar from '../tierAvatar/TierAvatar';

export interface TierChipProps extends HTMLAttributes<HTMLDivElement> {
    tier: Tier
}

const TierChip = ({ tier, children, ...props }: TierChipProps) => {
    const name = tier.title? tier.title : "-"
    return (
        <EntityChip
            name={name}
            description={tier.description}
            avatar={<TierAvatar tierId={tier.id}/>}
            {...props}>
            {children}
        </EntityChip>
    );
}

export default TierChip;