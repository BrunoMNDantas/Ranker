import { useMemo, useState } from 'react';
import { Assignment } from '../../../../assignment/model/Assignment.types';
import AssignmentsList from '../../../../assignment/components/assignmentsList/AssignmentsList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appAssignmentRoute } from '../../../../../app/Routes';
import ActionButton from '../../../../../components/actionButton/ActionButton';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import { IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { selectAssignmentsOfOption } from '../../../../assignment/store/Assignment.selectors';
import { deleteAssignmentThunk } from '../../../../assignment/store/Assignment.thunks';

export interface OptionAssignmentsPanelProps {
    optionId: string
    mode: Mode
}

export const OptionAssignmentsPanel = ({ optionId, mode }: OptionAssignmentsPanelProps) => {
    const dispatch = useAppDispatch()
    const assignments = useAppSelector((state) => selectAssignmentsOfOption(state, optionId))
    const [executing, setExecuting] = useState(false)
    const editMode = mode === Mode.EDIT

    const sortedAssignments = useMemo(() =>
        [...assignments].sort((a, b) => a.order - b.order),
        [assignments]
    )

    const execute = async (action: ()=>Promise<void>) => {
        setExecuting(true)
        try {
            return await action()
        } finally {
            return setExecuting(false)
        }
    }

    const handleDelete = async (assignment: Assignment) => {
        await execute(async () => {
            await dispatch(deleteAssignmentThunk(assignment.id)).unwrap()
        })
    }

    const getChipActions = (assignment: Assignment) => {
        return [
            <IconButton href={appAssignmentRoute(assignment.id)} color='info' size='small'>
                <VisibilityIcon fontSize='small' />
            </IconButton>,
            <ActionButton buttonAction={() => handleDelete(assignment)} color='error' size='small' disabled={!editMode || executing}>
                <ClearIcon fontSize='small'/>
            </ActionButton>
        ]
    }

    return <AssignmentsList assignmentIds={sortedAssignments.map(a => a.id)} chipActions={getChipActions}/>
}

export default OptionAssignmentsPanel;
