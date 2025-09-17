import React, { HTMLAttributes, ReactNode } from 'react';
import classes from './EntityCardHeader.module.css'

export interface EntityCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    avatar: ReactNode
}

const EntityCardHeader = ({ avatar, children, ...props }: EntityCardHeaderProps) => {
    const className = props.className ? props.className : classes.root

    return (
        <div className={className} {...props}>
            <div className={classes.avatar}>
                {avatar}
            </div>
            <div className={classes.labels}>
                {children}
            </div>
        </div>
    );
}

export default EntityCardHeader;