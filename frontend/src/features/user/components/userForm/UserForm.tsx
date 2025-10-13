import { HTMLAttributes } from 'react';
import { TextField } from '@mui/material';
import { Mode } from '../../../../components/entityCard/EntityCard';
import ColorField from '../../../../components/colorField/ColorField';
import EntityCardForm from '../../../../components/entityCard/entityCardForm/EntityCardForm';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { selectUserById } from '../../store/User.selectors';
import { updateUser } from '../../store/User.slice';

export interface UserFormProps extends HTMLAttributes<HTMLDivElement> {
    userId: string
    mode: Mode
}

const UserForm = ({ userId, mode, ...props }: UserFormProps) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => selectUserById(state, userId))
    const editable = mode === Mode.EDIT

    if (!user) {
        return null
    }

    const handleFieldChange = (changes: Partial<typeof user>) => {
        if (editable) {
            dispatch(updateUser({ id: userId, changes }))
        }
    }

    return (
        <EntityCardForm {...props}>
            <TextField
                label="Username"
                type="text"
                value={user.username}
                onChange={e => handleFieldChange({ username: e.target.value })}/>
            <TextField
                label="Image URL"
                type="url"
                value={user.imageUrl || ""}
                onChange={e => handleFieldChange({ imageUrl: e.target.value })}/>
            <ColorField
                disabled={!editable}
                label="Color"
                value={user.color}
                onChange={color => handleFieldChange({ color })}/>
        </EntityCardForm>
    )
}

export default UserForm;