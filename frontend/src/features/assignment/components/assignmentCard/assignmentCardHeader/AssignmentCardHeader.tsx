import { HTMLAttributes } from 'react';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import AssignmentAvatar from '../../assignmentAvatar/AssignmentAvatar';
import EntityProperty from '../../../../../components/entityProperty/EntityProperty';
import AssignmentBreadcrumbs from '../../assignmentBreadcrumbs/AssignmentBreadcrumbs';
import { useAppSelector } from '../../../../../app/hooks';
import { selectAssignmentById } from '../../../store/Assignment.selectors';

export interface AssignmentCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    assignmentId: string
    showBreadcrumbs?: boolean
    showCreationDate?: boolean
}

const AssignmentCardHeader = ({ assignmentId, showBreadcrumbs=true, showCreationDate=true, ...props }: AssignmentCardHeaderProps) => {
    const assignment = useAppSelector((state) => selectAssignmentById(state, assignmentId))

    if (!assignment) {
        return null
    }

    const order = assignment.order + "º"
    const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(assignment.creationDate)

    return (
        <EntityCardHeader avatar={<AssignmentAvatar assignmentId={assignment.id}/>} {...props}>
            { showBreadcrumbs ? <AssignmentBreadcrumbs assignmentId={assignment.id}/> : null }
            <EntityProperty value={order} variant='h6'/>
            { showCreationDate ? <EntityProperty value={date} variant='caption'/> : null }
        </EntityCardHeader>
    )
}

export default AssignmentCardHeader;