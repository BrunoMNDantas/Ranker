import React, { ReactNode } from 'react';
import { CardActions, CardActionsProps, IconButtonProps } from '@mui/material';
import ActionButton from '../../actionButton/ActionButton';

export interface Action {
    iconProps: IconButtonProps
    icon: ReactNode
    onClick: () => Promise<void>
    disabled: boolean
}

export interface CardActionProps {
    action: Action
}

export const EntityCardAction = ({ action }: CardActionProps) => {
    return (
        <ActionButton buttonAction={action.onClick} disabled={action.disabled} {...action.iconProps}>
            {action.icon}
        </ActionButton>
    )
}

export interface EntityCardActionsProps extends CardActionsProps {
    actions: Action[]
}

const EntityCardActions = ({ actions, ...props }: EntityCardActionsProps) => {
    return (
        <CardActions  sx={{ justifyContent: "space-evenly"}} {...props}>
            {actions.map(action => <EntityCardAction action={action}/>)}
        </CardActions>
    );
}

export default EntityCardActions;