import React, { HTMLAttributes } from 'react';
import classes from './OptionCardHeader.module.css';
import { Option } from '../../../model/Option.types';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import OptionAvatar from '../../optionAvatar/OptionAvatar';
import EntityProperty from '../../../../../components/entityProperty/EntityProperty';

export interface OptionCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    option: Option
}

const OptionCardHeader = ({ option, ...props }: OptionCardHeaderProps) => {
    const order = option.order + "º"
    const title = option.title
    const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(option.creationDate!)

    return (
        <EntityCardHeader avatar={<OptionAvatar option={option}/>} {...props}>
            <div className={classes.title}>
                <EntityProperty value={order} variant='h6'/>
                <EntityProperty value={title} variant='h6'/>
            </div>
            <EntityProperty value={date} variant='caption'/>
        </EntityCardHeader>
    )
}

export default OptionCardHeader;