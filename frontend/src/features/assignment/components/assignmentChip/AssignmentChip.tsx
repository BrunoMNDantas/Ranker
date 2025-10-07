import React, { HTMLAttributes } from 'react';
import EntityChip from '../../../../components/entityChip/EntityChip';
import AssignmentAvatar from '../assignmentAvatar/AssignmentAvatar';
import { useAppSelector } from '../../../../app/hooks';
import { selectAssignmentById } from '../../store/Assignment.selectors';

export interface AssignmentChipProps extends HTMLAttributes<HTMLDivElement> {
    assignmentId: string
}

const AssignmentChip = ({ assignmentId, children, ...props }: AssignmentChipProps) => {
    const assignment = useAppSelector(state => selectAssignmentById(state, assignmentId))

    if(!assignment) {
        return null
    }

    const name = "#" + assignment.order
    const description = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(assignment.creationDate)

    return (
        <EntityChip
            name={name}
            description={description}
            avatar={<AssignmentAvatar assignmentId={assignment.id}/>}
            {...props}>
            {children}
        </EntityChip>
    );
}

export default AssignmentChip;