import { appUserRoute, appVoteRoute } from '../../../../app/Routes';
import EntityBreadcrumbs from '../../../../components/entityBreadcrumbs/EntityBreadcrumbs';
import { BreadcrumbsProps } from '@mui/material';
import AssignmentIcon from '../assignmentIcon/AssignmentIcon';
import VoteIcon from '../../../vote/components/voteIcon/VoteIcon';
import { appAssignmentRoute } from '../../../../app/Routes';
import UserIcon from '../../../user/components/userIcon/UserIcon';
import { useAppSelector } from '../../../../app/hooks';
import { selectAssignmentById } from '../../store/Assignment.selectors';

export interface AssignmentBreadcrumbsProps extends BreadcrumbsProps {
    assignmentId: string
}

const AssignmentBreadcrumbs = ({ assignmentId, ...props }: AssignmentBreadcrumbsProps) => {
    const assignment = useAppSelector(state => selectAssignmentById(state, assignmentId))

    if(!assignment) {
        return null
    }

    const links=[
        {name: "Owner", href: appUserRoute(assignment.ownerId), Icon: UserIcon},
        {name: "Vote", href: appVoteRoute(assignment.voteId), Icon: VoteIcon},
        {name: "Assignment", href: appAssignmentRoute(assignment.id), Icon: AssignmentIcon}
    ]

    return <EntityBreadcrumbs links={links} {...props}/>
}

export default AssignmentBreadcrumbs;