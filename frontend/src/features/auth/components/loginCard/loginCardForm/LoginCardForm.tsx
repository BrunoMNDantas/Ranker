import { HTMLAttributes } from 'react';
import { TextField } from '@mui/material';
import EntityCardForm from '../../../../../components/entityCard/entityCardForm/EntityCardForm';

export interface LoginCardFormProps extends HTMLAttributes<HTMLDivElement> {
    email: string
    password: string
    onEmailChange: (email: string) => void
    onPasswordChange: (email: string) => void
}

const LoginCardForm = ({ email, password, onEmailChange, onPasswordChange, ...props }: LoginCardFormProps) => {
    return (
        <EntityCardForm {...props}>
            <TextField
                label="Email"
                type="text"
                value={email}
                onChange={e => onEmailChange(e.target.value)}/>
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={e => onPasswordChange(e.target.value)}/>
        </EntityCardForm>
    )
}

export default LoginCardForm;