import React, { HTMLAttributes } from 'react';
import { Assignment } from '../../../model/Assignment.types';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import AssignmentAvatar from '../../assignmentAvatar/AssignmentAvatar';

export interface AssignmentCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
}

const AssignmentCardHeader = ({ assignment, ...props }: AssignmentCardHeaderProps) => {
    return (
        <EntityCardHeader
            avatar={<AssignmentAvatar assignment={assignment}/>}
            name={`#${assignment.order}`}
            creationDate={assignment.creationDate!}
            {...props}/>
    );
}

export default AssignmentCardHeader;