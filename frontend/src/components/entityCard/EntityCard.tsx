import React, { ReactNode } from 'react';
import classes from './EntityCard.module.css';
import { Card, CardProps, Divider } from '@mui/material';

export enum Mode {
    EDIT,
    VIEW
}

export interface EntityCardProps extends CardProps {
    cardHeader: ReactNode
    cardContent: ReactNode
    cardActions: ReactNode
}

const EntityCard = ({ cardHeader, cardContent, cardActions, ...props }: EntityCardProps) => {
    const className = props.className || classes.root
    return (
        <Card className={className} {...props}>
            { cardHeader }
            <Divider/>
            { cardContent }
            <Divider/>
            { cardActions }
        </Card>
    );
}

export default EntityCard;