import React, { HTMLAttributes } from 'react';
import classes from './TierArea.module.css'
import { Tier } from '../../../../tier/model/Tier.types';
import { Option } from '../../../../option/model/Option.types';
import TierAvatar from '../../../../tier/components/tierAvatar/TierAvatar';
import { Divider } from '@mui/material';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import OptionArea from '../optionArea/OptionArea';

export interface TierAreaProps extends HTMLAttributes<HTMLDivElement> {
    tier: Tier,
    options: Option[]
}

export const TierArea = ({ tier, options, ...props } : TierAreaProps) => {
    const { setNodeRef } = useDroppable({id: `${tier.id}`});
    const optionsIds = options.map(option => option.id)

    return (
        <div ref={setNodeRef} className={classes.root} {...props}>
            <TierAvatar tier={tier}/>
            <Divider orientation='vertical'/>
            <div className={classes.tierOptions}>
                <SortableContext items={optionsIds} strategy={horizontalListSortingStrategy}>
                    { options.map(option => <OptionArea key={option.id} option={option}/>) }
                </SortableContext>
            </div>
        </div>
    )
}

export default TierArea;