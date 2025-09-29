import React, { HTMLAttributes } from 'react';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';
import UserIcon from '../userIcon/UserIcon';
import { User } from '../../model/User.types';

export interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
    user: User
}

const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
    return (
        <EntityAvatar
            imageUrl={user.imageUrl}
            Icon={UserIcon}
            avatarColor={user.color}
            {...props}/>
    )
}

export default UserAvatar;