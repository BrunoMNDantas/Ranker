import React, { ReactNode } from 'react';
import classes from './EntityCard.module.css';
import { Card, CardProps, Divider } from '@mui/material';

export enum Mode {
    EDIT,
    VIEW
}

export interface EntityCardProps extends CardProps {
    children: ReactNode[]
}

const EntityCard = ({ children, ...props }: EntityCardProps) => {
    const className = props.className || classes.root
    return (
        <Card className={className} {...props}>
            {children.flatMap((child, index) => [
                child,
                index < children.length - 1 ? <Divider key={`divider-${index}`} /> : null
            ])}
        </Card>
    );
}

export default EntityCard;