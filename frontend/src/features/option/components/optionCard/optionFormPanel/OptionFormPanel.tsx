import { useState, useEffect } from 'react';
import classes from './OptionFormPanel.module.css'
import { Mode } from '../../../../../components/entityCard/EntityCard';
import { Option } from '../../../model/Option.types';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import EntityCardActions, { Action } from '../../../../../components/entityCard/entityCardActions/EntityCardActions';
import OptionForm from '../../optionForm/OptionForm';
import { Divider } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { selectOptionById } from '../../../store/Option.selectors';
import { updateOption } from '../../../store/Option.slice';
import { updateOptionThunk, deleteOptionThunk } from '../../../store/Option.thunks';
import { useNavigate } from 'react-router-dom';
import { APP_RANKS_ROUTE } from '../../../../../app/Routes';

export interface OptionFormPanelProps {
    optionId: string
    mode: Mode
}

export const OptionFormPanel = ({ optionId, mode }: OptionFormPanelProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const option = useAppSelector((state) => selectOptionById(state, optionId))
    const [originalOption, setOriginalOption] = useState<Option | null>(null)
    const [executing, setExecuting] = useState(false)
    const editMode = mode === Mode.EDIT

    useEffect(() => {
        if (option && !originalOption) {
            setOriginalOption(structuredClone(option))
        }
    }, [option, originalOption])

    if (!option) {
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
            if (originalOption) {
                dispatch(updateOption({ id: originalOption.id, changes: originalOption }))
            }
        })
    }

    const handleSave = async () => {
        await execute(async () => {
            await dispatch(updateOptionThunk(option)).unwrap()
        })
    }

    const handleDelete = async () => {
        await execute(async () => {
            await dispatch(deleteOptionThunk(optionId)).unwrap()
            navigate(APP_RANKS_ROUTE)
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
            <OptionForm optionId={optionId} mode={mode}/>
            <Divider/>
            <EntityCardActions actions={[clearAction, saveAction, deleteAction]}/>
        </div>
    )
}

export default OptionFormPanel;
