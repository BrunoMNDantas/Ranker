import React, { HTMLAttributes } from 'react';
import { Assignment } from '../../model/Assignment.types';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';
import AssignmentIcon from '../assignmentIcon/AssignmentIcon';

export interface AssignmentAvatarProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
}

const AssignmentAvatar = ({ assignment, ...props }: AssignmentAvatarProps) => {
    return <EntityAvatar Icon={AssignmentIcon} {...props}/>
}

export default AssignmentAvatar;