import React, { HTMLAttributes } from 'react';
import classes from './UnassignedArea.module.css'
import { Option } from '../../../../option/model/Option.types';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import OptionArea from '../optionArea/OptionArea';

export const UNASSIGNED_AREA_ID = "unassigned-options"

export interface UnassignedOptionsAreaProps extends HTMLAttributes<HTMLDivElement> {
    options: Option[]
}

const UnassignedOptionsArea = ({ options, ...props }: UnassignedOptionsAreaProps) => {
    const { setNodeRef } = useDroppable({id: UNASSIGNED_AREA_ID})
    const sortedOptions = options.sort((optionA, optionB) => optionA.order - optionB.order)
    const optionsIds = options.map(option => option.id)

    return (
        <div ref={setNodeRef} className={classes.root} {...props}>
            <SortableContext items={optionsIds} strategy={horizontalListSortingStrategy}>
                { sortedOptions.map(option => <OptionArea key={option.id} option={option}/>) }
            </SortableContext>
        </div>
    )
};

export default UnassignedOptionsArea;