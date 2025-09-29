import React, { HTMLAttributes } from 'react';
import { Assignment } from '../../model/Assignment.types';
import EntityChip from '../../../../components/entityChip/EntityChip';
import AssignmentAvatar from '../assignmentAvatar/AssignmentAvatar';

export interface AssignmentChipProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
}

const AssignmentChip = ({ assignment, children, ...props }: AssignmentChipProps) => {
    const name = "#" + assignment.order
    const description = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(assignment.creationDate)

    return (
        <EntityChip
            name={name}
            description={description}
            avatar={<AssignmentAvatar assignment={assignment}/>}
            {...props}>
            {children}
        </EntityChip>
    );
}

export default AssignmentChip;