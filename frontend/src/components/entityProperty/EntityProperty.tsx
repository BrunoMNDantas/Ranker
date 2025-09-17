import React from 'react';
import classes from './EntityProperty.module.css';
import { Tooltip, Typography, TypographyProps } from '@mui/material';

export interface EntityPropertyProps extends TypographyProps {
    value?: string | null
}

const EntityProperty = ({ value, ...props }: EntityPropertyProps) => {
    const className = props.className || classes.root

    return (
        <Tooltip title={value || ""} enterDelay={1000} enterNextDelay={1000} placement='top'>
            <Typography className={className} {...props}>{value || ""}</Typography>
        </Tooltip>
    )
}

export default EntityProperty;