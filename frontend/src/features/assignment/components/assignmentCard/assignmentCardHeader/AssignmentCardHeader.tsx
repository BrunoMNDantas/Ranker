import React, { HTMLAttributes } from 'react';
import { Assignment } from '../../../model/Assignment.types';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import AssignmentAvatar from '../../assignmentAvatar/AssignmentAvatar';
import EntityProperty from '../../../../../components/entityProperty/EntityProperty';
import AssignmentBreadcrumbs from '../../assignmentBreadcrumbs/AssignmentBreadcrumbs';

export interface AssignmentCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
    showBreadcrumbs?: boolean
    showCreationDate?: boolean
}

const AssignmentCardHeader = ({ assignment, showBreadcrumbs=true, showCreationDate=true, ...props }: AssignmentCardHeaderProps) => {
    const order = assignment.order + "º"
    const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(assignment.creationDate)

    return (
        <EntityCardHeader avatar={<AssignmentAvatar assignment={assignment}/>} {...props}>
            { showBreadcrumbs ? <AssignmentBreadcrumbs assignment={assignment}/> : null }
            <EntityProperty value={order} variant='h6'/>
            { showCreationDate ? <EntityProperty value={date} variant='caption'/> : null }
        </EntityCardHeader>
    )
}

export default AssignmentCardHeader;