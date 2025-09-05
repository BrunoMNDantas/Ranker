import React, { HTMLAttributes } from 'react';
import { Assignment } from '../../model/Assignment.types';
import EntityChip from '../../../../components/entityChip/EntityChip';
import AssignmentAvatar from '../assignmentAvatar/AssignmentAvatar';

export interface AssignmentChipProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
}

const AssignmentChip = ({ assignment, ...props }: AssignmentChipProps) => {
    const name = "#" + assignment.order
    const description = assignment.creationDate ? new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(assignment.creationDate) : null

    return (
        <EntityChip name={name} description={description} {...props}>
            <AssignmentAvatar assignment={assignment}/>
        </EntityChip>
    );
}

export default AssignmentChip;