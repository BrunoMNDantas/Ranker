import React, { HTMLAttributes } from 'react';
import classes from './TierCardHeader.module.css';
import { Tier } from '../../../model/Tier.types';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import TierAvatar from '../../tierAvatar/TierAvatar';
import EntityProperty from '../../../../../components/entityProperty/EntityProperty';

export interface TierCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    tier: Tier
}

const TierCardHeader = ({ tier, ...props }: TierCardHeaderProps) => {
    const order = tier.order + "º"
    const title = tier.title
    const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(tier.creationDate!)

    return (
        <EntityCardHeader avatar={<TierAvatar tier={tier}/>} {...props}>
            <div className={classes.title}>
                <EntityProperty value={order} variant='h6'/>
                <EntityProperty value={title} variant='h6'/>
            </div>
            <EntityProperty value={date} variant='caption'/>
        </EntityCardHeader>
    )
}

export default TierCardHeader;