import React from 'react';
import { Assignment } from '../../../assignment/model/Assignment.types';
import AssignmentsList from '../../../assignment/components/assignmentsList/AssignmentsList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appAssignmentRoute } from '../../../../app/Routes';
import ActionButton from '../../../../components/actionButton/ActionButton';
import { IconButton } from '@mui/material';

export interface VoteAssignmentsTabViewProps {
    assignments: Assignment[]
    editMode: boolean
    onDeleteAssignment: (assignment: Assignment) => Promise<void>
}

export const VoteAssignmentsTabView = ({ assignments, editMode, onDeleteAssignment }: VoteAssignmentsTabViewProps) => {
    const sortedAssignments = assignments.sort((a, b) => a.order! - b.order!)

    const handleDelete = async (e: React.MouseEvent, assignment: Assignment) => {
        e.preventDefault()
        await onDeleteAssignment(assignment)
    }

    return (
        <AssignmentsList
            assignments={sortedAssignments}
            chipActions={assignment => [
                <IconButton href={appAssignmentRoute(assignment.id!)} color='info' size='small'>
                    <VisibilityIcon fontSize='small' />
                </IconButton>,
                <ActionButton buttonAction={e => handleDelete(e, assignment)} color='error' size='small' disabled={!editMode}>
                    <ClearIcon fontSize='small' />
                </ActionButton>
            ]} />
    )
}

export default VoteAssignmentsTabView;