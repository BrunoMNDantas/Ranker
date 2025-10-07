import React, { HTMLAttributes } from 'react';
import classes from './TierCardHeader.module.css';
import { Tier } from '../../../model/Tier.types';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import TierAvatar from '../../tierAvatar/TierAvatar';
import EntityProperty from '../../../../../components/entityProperty/EntityProperty';
import TierBreadcrumbs from '../../tierBreadcrumbs/TierBreadcrumbs';

export interface TierCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    tier: Tier
    showBreadcrumbs?: boolean
    showCreationDate?: boolean
    showDescription?: boolean
}

const TierCardHeader = ({ tier, showBreadcrumbs=true, showCreationDate=true, showDescription=true, ...props }: TierCardHeaderProps) => {
    const order = tier.order + "º"
    const title = tier.title
    const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(tier.creationDate)
    const description = tier.description

    return (
        <EntityCardHeader avatar={<TierAvatar tierId={tier.id}/>} {...props}>
            { showBreadcrumbs ? <TierBreadcrumbs tier={tier}/> : null }
            <div className={classes.title}>
                <EntityProperty value={order} variant='h6'/>
                <EntityProperty value={title} variant='h6'/>
            </div>
            { showCreationDate ? <EntityProperty value={date} variant='caption'/> : null }
            { showDescription ? <EntityProperty value={description} variant='caption'/> : null }
        </EntityCardHeader>
    )
}

export default TierCardHeader;