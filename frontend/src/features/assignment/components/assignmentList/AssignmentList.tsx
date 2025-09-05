import React, { HTMLAttributes } from 'react';
import { Assignment } from '../../model/Assignment.types';
import AssignmentChip from '../assignmentChip/AssignmentChip';
import EntityList from '../../../../components/entityList/EntityList';

export interface AssignmentListProps extends HTMLAttributes<HTMLDivElement> {
    assignments: Assignment[]
    assignmentUrl?: (assignment: Assignment) => string
    onAssignmentClick?: (assignment: Assignment) => void
}

const AssignmentList = ({ assignments, assignmentUrl, onAssignmentClick, ...props }: AssignmentListProps) => {
    return <EntityList
        entities={assignments}
        entityRenderer={assignment => <AssignmentChip assignment={assignment}/>}
        entityUrl={assignmentUrl}
        onEntityClick={onAssignmentClick}
        {...props}/>
}

export default AssignmentList;