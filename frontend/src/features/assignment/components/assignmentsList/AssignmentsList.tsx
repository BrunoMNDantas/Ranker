import React, { HTMLAttributes, ReactNode } from 'react';
import { Assignment } from '../../model/Assignment.types';
import AssignmentChip from '../assignmentChip/AssignmentChip';
import EntityList from '../../../../components/entityList/EntityList';
import { useAppSelector } from '../../../../app/hooks';
import { selectAssignmentById } from '../../store/Assignment.selectors';

export interface AssignmentsListProps extends HTMLAttributes<HTMLDivElement> {
    assignmentIds: string[]
    assignmentUrl?: (assignment: Assignment) => string
    onAssignmentClick?: (assignment: Assignment) => void
    chipActions?: (assignment: Assignment) => ReactNode[]
}

const AssignmentsList = ({ assignmentIds, assignmentUrl, onAssignmentClick, chipActions=()=>[], ...props }: AssignmentsListProps) => {
    const assignments = useAppSelector(state => assignmentIds.map(id => selectAssignmentById(state, id)))

    return (
        <EntityList
            entities={assignments}
            entityRenderer={assignment => <AssignmentChip assignmentId={assignment.id}>{chipActions(assignment)}</AssignmentChip>}
            entityUrl={assignmentUrl}
            onEntityClick={onAssignmentClick}
            {...props}/>
    )
}

export default AssignmentsList;