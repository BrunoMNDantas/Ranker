import React, { HTMLAttributes, ReactNode } from 'react';
import classes from './EntityCardContent.module.css';
import { CardContent } from '@mui/material';

export interface EntityCardContentProps extends HTMLAttributes<HTMLDivElement> {
    properties: ReactNode[]
}

const EntityCardContent = ({ properties, ...props }: EntityCardContentProps) => {
    const className = props.className ? props.className : classes.root
    return (
        <CardContent className={className} {...props}>
            {properties}
        </CardContent>
    );
}

export default EntityCardContent;