import { useState, useEffect } from 'react';
import classes from './UserFormPanel.module.css'
import { Mode } from '../../../../../components/entityCard/EntityCard';
import { User } from '../../../model/User.types';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import EntityCardActions, { Action } from '../../../../../components/entityCard/entityCardActions/EntityCardActions';
import UserForm from '../../userForm/UserForm';
import { Divider } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { selectUserById } from '../../../store/User.selectors';
import { updateUser } from '../../../store/User.slice';
import { updateUserThunk, deleteUserThunk } from '../../../store/User.thunks';
import { useNavigate } from 'react-router-dom';
import { APP_USERS_ROUTE } from '../../../../../app/Routes';

export interface UserFormPanelProps {
    userId: string
    mode: Mode
}

export const UserFormPanel = ({ userId, mode }: UserFormPanelProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const user = useAppSelector((state) => selectUserById(state, userId))
    const [originalUser, setOriginalUser] = useState<User | null>(null)
    const [executing, setExecuting] = useState(false)
    const editMode = mode === Mode.EDIT

    useEffect(() => {
        if (user && !originalUser) {
            setOriginalUser(structuredClone(user))
        }
    }, [user, originalUser])

    if (!user) {
        return null
    }

    const execute = async (action: ()=>Promise<void>) => {
        setExecuting(true)
        try {
            return await action()
        } finally {
            return setExecuting(false)
        }
    }

    const handleClear = async () => {
        await execute(async () => {
            if (originalUser) {
                dispatch(updateUser({ id: originalUser.id, changes: originalUser }))
            }
        })
    }

    const handleSave = async () => {
        await execute(async () => {
            await dispatch(updateUserThunk(user)).unwrap()
        })
    }

    const handleDelete = async () => {
        await execute(async () => {
            await dispatch(deleteUserThunk(userId)).unwrap()
            navigate(APP_USERS_ROUTE)
        })
    }

    const clearAction: Action = {
        iconProps: { color: "info" },
        icon: <RestoreIcon/>,
        onClick: handleClear,
        disabled: executing || !editMode
    }

    const saveAction: Action = {
        iconProps: { color: "info" },
        icon: <SaveIcon/>,
        onClick: handleSave,
        disabled: executing || !editMode
    }

    const deleteAction: Action = {
        iconProps: { color: "error" },
        icon: <DeleteIcon/>,
        onClick: handleDelete,
        disabled: executing || !editMode
    }

    return (
        <div className={classes.root}>
            <UserForm userId={userId} mode={mode}/>
            <Divider/>
            <EntityCardActions actions={[clearAction, saveAction, deleteAction]}/>
        </div>
    )
}

export default UserFormPanel;
