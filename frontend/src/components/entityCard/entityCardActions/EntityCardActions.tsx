import React, { HTMLAttributes, ReactNode, useState } from 'react';
import { CardActions, CardActionsProps, CircularProgress, IconButton, IconButtonProps } from '@mui/material';

const SPINNER_SIZE_MAP: Record<NonNullable<IconButtonProps["size"]>, number> = {
  small: 16,
  medium: 20,
  large: 24,
};

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
    const [executing, setExecuting] = useState(false)
    const spinnerSize = SPINNER_SIZE_MAP[action.iconProps.size || "medium"] + "px"

    const handleClick = () => {
        setExecuting(true)
        action.onClick()
            .finally(() => setExecuting(false))
    }

    return (
        <IconButton onClick={handleClick} disabled={action.disabled} {...action.iconProps}>
            {
                executing ?
                    <CircularProgress size={spinnerSize}/> :
                    action.icon
            }
        </IconButton>
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