import React from 'react';
import { appVoteRoute } from '../../../../app/Routes';
import EntityBreadcrumbs from '../../../../components/entityBreadcrumbs/EntityBreadcrumbs';
import { BreadcrumbsProps } from '@mui/material';
import AssignmentIcon from '../assignmentIcon/AssignmentIcon';
import VoteIcon from '../../../vote/components/voteIcon/VoteIcon';
import { Assignment } from '../../model/Assignment.types';
import { appAssignmentRoute } from '../../../../app/Routes';

export interface AssignmentBreadcrumbsProps extends BreadcrumbsProps {
    assignment: Assignment
}

const AssignmentBreadcrumbs = ({ assignment, ...props }: AssignmentBreadcrumbsProps) => {
    const links=[
        {name: "Vote", href: appVoteRoute(assignment.voteId), Icon: VoteIcon},
        {name: "Assignment", href: appAssignmentRoute(assignment.id), Icon: AssignmentIcon}
    ]

    return <EntityBreadcrumbs links={links} {...props}/>
}

export default AssignmentBreadcrumbs;