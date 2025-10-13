import { HTMLAttributes } from 'react';
import classes from './TierCardHeader.module.css';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import TierAvatar from '../../tierAvatar/TierAvatar';
import EntityProperty from '../../../../../components/entityProperty/EntityProperty';
import TierBreadcrumbs from '../../tierBreadcrumbs/TierBreadcrumbs';
import { useAppSelector } from '../../../../../app/hooks';
import { selectTierById } from '../../../store/Tier.selectors';

export interface TierCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    tierId: string
    showBreadcrumbs?: boolean
    showCreationDate?: boolean
    showDescription?: boolean
}

const TierCardHeader = ({ tierId, showBreadcrumbs=true, showCreationDate=true, showDescription=true, ...props }: TierCardHeaderProps) => {
    const tier = useAppSelector((state) => selectTierById(state, tierId))

    if (!tier) {
        return null
    }

    const order = tier.order + "º"
    const title = tier.title
    const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(tier.creationDate)
    const description = tier.description

    return (
        <EntityCardHeader avatar={<TierAvatar tierId={tier.id}/>} {...props}>
            { showBreadcrumbs ? <TierBreadcrumbs tierId={tier.id}/> : null }
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