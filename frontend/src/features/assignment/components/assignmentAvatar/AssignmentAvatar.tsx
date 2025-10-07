import React, { HTMLAttributes } from 'react';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';
import AssignmentIcon from '../assignmentIcon/AssignmentIcon';
import { useAppSelector } from '../../../../app/hooks';
import { selectAssignmentById } from '../../store/Assignment.selectors';

export interface AssignmentAvatarProps extends HTMLAttributes<HTMLDivElement> {
    assignmentId: string
}

const AssignmentAvatar = ({ assignmentId, ...props }: AssignmentAvatarProps) => {
    const assignment = useAppSelector(state => selectAssignmentById(state, assignmentId))

    if(!assignment) {
        return null
    }

    return <EntityAvatar Icon={AssignmentIcon} {...props}/>
}

export default AssignmentAvatar;