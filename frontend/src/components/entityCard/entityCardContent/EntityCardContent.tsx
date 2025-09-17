import React, { ReactNode } from 'react';
import classes from './EntityCardContent.module.css';
import { CardContent, CardContentProps } from '@mui/material';

export interface EntityCardContentProps extends CardContentProps {
    properties: ReactNode[]
}

const EntityCardContent = ({ properties, ...props }: EntityCardContentProps) => {
    const className = props.className || classes.root
    return (
        <CardContent className={className} {...props}>
            {properties}
        </CardContent>
    );
}

export default EntityCardContent;