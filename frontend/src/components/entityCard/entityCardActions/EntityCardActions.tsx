import { ReactNode } from 'react';
import { CardActions, CardActionsProps, IconButtonProps } from '@mui/material';
import ActionButton from '../../actionButton/ActionButton';

export interface Action {
    iconProps: IconButtonProps
    icon: ReactNode
    onClick: () => Promise<void>
    disabled: boolean
    testId?: string
}

export interface CardActionProps {
    action: Action
}

export const EntityCardAction = ({ action }: CardActionProps) => {
    return (
        <ActionButton buttonAction={action.onClick} disabled={action.disabled} data-testid={action.testId} {...action.iconProps}>
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
            {actions.map((action, index) => <EntityCardAction key={action.testId || index} action={action}/>)}
        </CardActions>
    );
}

export default EntityCardActions;