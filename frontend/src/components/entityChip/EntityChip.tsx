import React, { HTMLAttributes, ReactNode } from 'react';
import classes from './EntityChip.module.css';
import EntityProperty from '../entityProperty/EntityProperty';

export interface EntityChipProps extends HTMLAttributes<HTMLDivElement> {
    name: string | null
    description: string | null
    avatar: ReactNode
}

const EntityChip = ({ name, description, avatar, children, ...props }: EntityChipProps) => {
    const className = props.className || classes.root

    return (
        <div className={className} {...props}>
            {avatar}
            <div className={classes.labels}>
                <EntityProperty className={classes.name} variant="h6" value={name}/>
                <EntityProperty className={classes.description} variant="caption" value={description}/>
            </div>
            <div className={classes.actions}>
                {children}
            </div>
        </div>
    );
}

export default EntityChip;