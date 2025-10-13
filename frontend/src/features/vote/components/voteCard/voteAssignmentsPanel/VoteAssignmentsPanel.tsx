import { useMemo } from 'react';
import { Assignment } from '../../../../assignment/model/Assignment.types';
import AssignmentsList from '../../../../assignment/components/assignmentsList/AssignmentsList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appAssignmentRoute } from '../../../../../app/Routes';
import ActionButton from '../../../../../components/actionButton/ActionButton';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import { IconButton } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { selectAssignmentsOfVote } from '../../../../assignment/store/Assignment.selectors';
import { deleteAssignmentThunk } from '../../../../assignment/store/Assignment.thunks';

export interface VoteAssignmentsPanelProps {
    voteId: string
    mode: Mode
}

export const VoteAssignmentsPanel = ({ voteId, mode }: VoteAssignmentsPanelProps) => {
    const dispatch = useAppDispatch()
    const assignments = useAppSelector((state) => selectAssignmentsOfVote(state, voteId))

    const sortedAssignments = useMemo(() =>
        [...assignments].sort((a, b) => a.order - b.order),
        [assignments]
    )

    const handleDelete = async (assignment: Assignment) => {
        await dispatch(deleteAssignmentThunk(assignment.id)).unwrap()
    }

    const getChipActions = (assignment: Assignment) => {
        return [
            <IconButton href={appAssignmentRoute(assignment.id)} color='info' size='small'>
                <VisibilityIcon fontSize='small' />
            </IconButton>,
            <ActionButton buttonAction={e => handleDelete(assignment)} color='error' size='small'>
                <ClearIcon fontSize='small'/>
            </ActionButton>
        ]
    }

    return <AssignmentsList assignmentIds={sortedAssignments.map(a => a.id)} chipActions={getChipActions}/>
}

export default VoteAssignmentsPanel;