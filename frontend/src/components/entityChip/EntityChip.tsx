import React, { HTMLAttributes } from 'react';
import classes from './EntityChip.module.css';
import { Tooltip, Typography } from '@mui/material';

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
                <Tooltip title={name} enterDelay={1000} enterNextDelay={1000} placement='top'>
                    <Typography className={classes.name} variant="h5">{name}</Typography>
                </Tooltip>
                <Tooltip title={description} enterDelay={1000} enterNextDelay={1000} placement='top'>
                    <Typography className={classes.description} variant="subtitle2">{description}</Typography>
                </Tooltip>
            </div>
        </div>
    );
}

export default EntityChip;