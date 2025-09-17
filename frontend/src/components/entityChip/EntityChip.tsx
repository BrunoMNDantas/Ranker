import React, { HTMLAttributes } from 'react';
import classes from './EntityChip.module.css';
import EntityProperty from '../entityProperty/EntityProperty';

export interface EntityChipProps extends HTMLAttributes<HTMLDivElement> {
    name: string | null
    description: string | null
}

const EntityChip = ({ name, description, children, ...props }: EntityChipProps) => {
    const className = props.className ? props.className : classes.root

    return (
        <div className={className} {...props}>
            {children}
            <div className={classes.labels}>
                <EntityProperty className={classes.name} variant="h6" value={name}/>
                <EntityProperty className={classes.description} variant="caption" value={description}/>
            </div>
        </div>
    );
}

export default EntityChip;