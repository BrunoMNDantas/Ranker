import React from 'react';
import { Assignment } from '../../../../assignment/model/Assignment.types';
import AssignmentsList from '../../../../assignment/components/assignmentsList/AssignmentsList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appAssignmentRoute } from '../../../../../app/Routes';
import ActionButton from '../../../../../components/actionButton/ActionButton';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import { IconButton } from '@mui/material';

export interface VoteAssignmentsPanelProps {
    assignments: Assignment[]
    mode: Mode
    onDeleteAssignment: (assignment: Assignment) => Promise<void>
}

export const VoteAssignmentsPanel = ({ assignments, mode, onDeleteAssignment }: VoteAssignmentsPanelProps) => {
    const sortedAssignments = assignments.sort((a, b) => a.order - b.order)

    const handleDelete = async (assignment: Assignment) => {
        await onDeleteAssignment(assignment)
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