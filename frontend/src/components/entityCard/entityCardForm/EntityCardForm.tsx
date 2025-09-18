import React, { ReactNode } from 'react';
import classes from './EntityCardForm.module.css';
import { CardContent, CardContentProps } from '@mui/material';

export interface EntityCardFormProps extends CardContentProps {
    properties: ReactNode[]
}

const EntityCardForm = ({ properties, ...props }: EntityCardFormProps) => {
    const className = props.className || classes.root
    return (
        <CardContent className={className} {...props}>
            {properties}
        </CardContent>
    );
}

export default EntityCardForm;