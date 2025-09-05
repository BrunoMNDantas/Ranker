import React, { HTMLAttributes, ReactNode } from 'react';
import classes from './EntityCardHeader.module.css';
import { Tooltip, Typography } from '@mui/material';

export interface EntityCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    avatar: ReactNode
    name: string
    creationDate: Date
}

const EntityCardHeader = ({ avatar, name, creationDate, ...props }: EntityCardHeaderProps) => {
    const className = props.className ? props.className : classes.root
    const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(creationDate)

    return (
        <div className={className} {...props}>
            <div className={classes.avatar}>
                {avatar}
            </div>
            <div className={classes.labels}>
                <div className={classes.name}>
                    <Tooltip title={name} enterDelay={1000} enterNextDelay={1000} placement='top'>
                        <Typography variant='h6'>{name}</Typography>
                    </Tooltip>
                </div>
                <div className={classes.creationDate}>
                    <Tooltip title={date} enterDelay={1000} enterNextDelay={1000} placement='top'>
                        <Typography variant='caption'>{date}</Typography>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default EntityCardHeader;