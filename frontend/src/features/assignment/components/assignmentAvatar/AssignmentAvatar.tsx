import React, { HTMLAttributes } from 'react';
import { Assignment } from '../../model/Assignment.types';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';

export interface AssignmentAvatarProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
}

const AssignmentAvatar = ({ assignment, ...props }: AssignmentAvatarProps) => {
    const imageUrl = '/link.png'
    return <EntityAvatar imageUrl={imageUrl} avatarColor={null} {...props}/>;
}

export default AssignmentAvatar;