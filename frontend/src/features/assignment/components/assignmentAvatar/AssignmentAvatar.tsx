import React, { HTMLAttributes } from 'react';
import { Assignment } from '../../model/Assignment.types';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';
import LinkIcon from '@mui/icons-material/Link';

export interface AssignmentAvatarProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
}

const AssignmentAvatar = ({ assignment, ...props }: AssignmentAvatarProps) => {
    return <EntityAvatar Icon={LinkIcon} {...props}/>
}

export default AssignmentAvatar;