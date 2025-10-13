import { HTMLAttributes } from 'react';
import classes from './OptionCardHeader.module.css';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import OptionAvatar from '../../optionAvatar/OptionAvatar';
import EntityProperty from '../../../../../components/entityProperty/EntityProperty';
import OptionBreadcrumbs from '../../optionBreadcrumbs/OptionBreadcrumbs';
import { useAppSelector } from '../../../../../app/hooks';
import { selectOptionById } from '../../../store/Option.selectors';

export interface OptionCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    optionId: string
    showBreadcrumbs?: boolean
    showCreationDate?: boolean
    showDescription?: boolean
}

const OptionCardHeader = ({ optionId, showBreadcrumbs=true, showCreationDate=true, showDescription=true, ...props }: OptionCardHeaderProps) => {
    const option = useAppSelector((state) => selectOptionById(state, optionId))

    if (!option) {
        return null
    }

    const order = option.order + "º"
    const title = option.title
    const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(option.creationDate)
    const description = option.description

    return (
        <EntityCardHeader avatar={<OptionAvatar optionId={option.id}/>} {...props}>
            { showBreadcrumbs ? <OptionBreadcrumbs optionId={option.id}/> : null }
            <div className={classes.title}>
                <EntityProperty value={order} variant='h6'/>
                <EntityProperty value={title} variant='h6'/>
            </div>
            { showCreationDate ? <EntityProperty value={date} variant='caption'/> : null }
            { showDescription ? <EntityProperty value={description} variant='caption'/> : null }
        </EntityCardHeader>
    )
}

export default OptionCardHeader;