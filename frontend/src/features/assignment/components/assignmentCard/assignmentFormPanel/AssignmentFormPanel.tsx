import { useState, useEffect } from 'react';
import classes from './AssignmentFormPanel.module.css'
import { Mode } from '../../../../../components/entityCard/EntityCard';
import { Assignment } from '../../../model/Assignment.types';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import EntityCardActions, { Action } from '../../../../../components/entityCard/entityCardActions/EntityCardActions';
import AssignmentForm from '../../assignmentForm/AssignmentForm';
import { Divider } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { selectAssignmentById } from '../../../store/Assignment.selectors';
import { updateAssignment } from '../../../store/Assignment.slice';
import { updateAssignmentThunk, deleteAssignmentThunk } from '../../../store/Assignment.thunks';
import { useNavigate } from 'react-router-dom';
import { APP_ASSIGNMENTS_ROUTE } from '../../../../../app/Routes';

export interface AssignmentFormPanelProps {
    assignmentId: string
    mode: Mode
}

export const AssignmentFormPanel = ({ assignmentId, mode }: AssignmentFormPanelProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const assignment = useAppSelector((state) => selectAssignmentById(state, assignmentId))
    const [originalAssignment, setOriginalAssignment] = useState<Assignment | null>(null)
    const [executing, setExecuting] = useState(false)
    const editMode = mode === Mode.EDIT

    useEffect(() => {
        if (assignment && !originalAssignment) {
            setOriginalAssignment(structuredClone(assignment))
        }
    }, [assignment, originalAssignment])

    if (!assignment) {
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
            if (originalAssignment) {
                dispatch(updateAssignment({ id: originalAssignment.id, changes: originalAssignment }))
            }
        })
    }

    const handleSave = async () => {
        await execute(async () => {
            await dispatch(updateAssignmentThunk(assignment)).unwrap()
        })
    }

    const handleDelete = async () => {
        await execute(async () => {
            await dispatch(deleteAssignmentThunk(assignmentId)).unwrap()
            navigate(APP_ASSIGNMENTS_ROUTE)
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
            <AssignmentForm assignmentId={assignmentId} mode={mode}/>
            <Divider/>
            <EntityCardActions actions={[clearAction, saveAction, deleteAction]}/>
        </div>
    )
}

export default AssignmentFormPanel;
