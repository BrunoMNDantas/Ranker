import React, { HTMLAttributes } from 'react';
import { TextField } from '@mui/material';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import ColorField from '../../../../../components/colorField/ColorField';
import EntityCardForm from '../../../../../components/entityCard/entityCardForm/EntityCardForm';
import { User } from '../../../model/User.types';

export interface UserCardFormProps extends HTMLAttributes<HTMLDivElement> {
    user: User
    onUserChange: (user: User) => void
    mode: Mode
}

const UserCardForm = ({ user, onUserChange, mode, ...props }: UserCardFormProps) => {
    const editable = mode === Mode.EDIT

    return (
        <EntityCardForm {...props}>
            <TextField
                label="Username"
                type="text"
                value={user.username}
                onChange={e => editable ? onUserChange({...user, username: e.target.value}) : null}/>
            <TextField
                label="Image URL"
                type="url"
                value={user.imageUrl || ""}
                onChange={e => editable ? onUserChange({...user, imageUrl: e.target.value}) : null}/>
            <ColorField
                disabled={!editable}
                label="Color"
                value={user.color}
                onChange={color => editable ? onUserChange({...user, color}) : null}/>
        </EntityCardForm>
    )
}

export default UserCardForm;