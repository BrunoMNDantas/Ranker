import React, { HTMLAttributes } from 'react';
import { Assignment } from '../../../model/Assignment.types';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import AssignmentAvatar from '../../assignmentAvatar/AssignmentAvatar';
import EntityProperty from '../../../../../components/entityProperty/EntityProperty';

export interface AssignmentCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
}

const AssignmentCardHeader = ({ assignment, ...props }: AssignmentCardHeaderProps) => {
    const order = assignment.order + "º"
    const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(assignment.creationDate!)

    return (
        <EntityCardHeader avatar={<AssignmentAvatar assignment={assignment}/>} {...props}>
            <EntityProperty value={order} variant='h6'/>
            <EntityProperty value={date} variant='caption'/>
        </EntityCardHeader>
    )
}

export default AssignmentCardHeader;