import { ReactNode } from 'react';
import classes from './EntityCardForm.module.css';
import { CardContent, CardContentProps } from '@mui/material';

export interface EntityCardFormProps extends CardContentProps {
    children?: ReactNode
}

const EntityCardForm = ({ children, ...props }: EntityCardFormProps) => {
    const className = props.className || classes.root
    return (
        <CardContent className={className} {...props}>
            {children}
        </CardContent>
    );
}

export default EntityCardForm;