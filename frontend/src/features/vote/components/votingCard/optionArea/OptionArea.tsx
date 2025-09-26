import React, { HTMLAttributes } from 'react';
import classes from './OptionArea.module.css'
import { Option } from '../../../../option/model/Option.types';
import OptionAvatar from '../../../../option/components/optionAvatar/OptionAvatar';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from '@mui/material';

export interface OptionAreaProps extends HTMLAttributes<HTMLDivElement> {
    option: Option
}

const OptionArea = ({ option, ...props }: OptionAreaProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({id: option.id})

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
        visibility: isDragging ? 'hidden' : 'visible'
    }

    return (
        <div ref={setNodeRef} className={classes.root} style={style} {...listeners} {...attributes} {...props}>
            <OptionAvatar option={option}/>
        </div>
    )
}

export default OptionArea;