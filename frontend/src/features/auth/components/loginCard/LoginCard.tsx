import React, { HTMLAttributes, useState } from 'react';
import EntityCard from '../../../../components/entityCard/EntityCard';
import LoginCardForm from './loginCardForm/LoginCardForm';
import EntityCardActions, { Action } from '../../../../components/entityCard/entityCardActions/EntityCardActions';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Typography } from '@mui/material';

export interface LoginCardProps extends HTMLAttributes<HTMLDivElement> {
    onRegisterUser: (email: string, password: string) => Promise<void>
    onLoginWithEmail: (email: string, password: string) => Promise<void>
    onLoginWithGoogle: () => Promise<void>
}

const LoginCard = ({ onRegisterUser, onLoginWithEmail, onLoginWithGoogle, ...props }: LoginCardProps) => {
    const [executing, setExecuting] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const execute = async (func: () => Promise<void>) => {
        setExecuting(true)

        try {
            await func()
        } finally {
            setExecuting(false)
        }
    }

    const registerAction: Action = {
        iconProps: { color: "info" },
        icon: <PersonAddIcon/>,
        onClick: () => execute(() => onRegisterUser(email, password)),
        disabled: executing
    }

    const loginAction: Action = {
        iconProps: { color: "info" },
        icon: <LoginIcon/>,
        onClick: () => execute(() => onLoginWithEmail(email, password)),
        disabled: executing
    }

     const googleAction: Action = {
        iconProps: { color: "info" },
        icon: <GoogleIcon/>,
        onClick: () => execute(() => onLoginWithGoogle()),
        disabled: executing
    }

    const actions = [registerAction, loginAction, googleAction]

    return (
        <EntityCard {...props}>
            <Typography variant='h3'>Login</Typography>
            <LoginCardForm email={email} password={password} onEmailChange={setEmail} onPasswordChange={setPassword}/>
            <EntityCardActions actions={actions}/>
        </EntityCard>
    )
}

export default LoginCard;