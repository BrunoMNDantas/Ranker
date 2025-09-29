import React, { HTMLAttributes } from 'react';
import EntityChip from '../../../../components/entityChip/EntityChip';
import UserAvatar from '../userAvatar/UserAvatar';
import { User } from '../../model/User.types';

export interface UserChipProps extends HTMLAttributes<HTMLDivElement> {
    user: User
}

const UserChip = ({ user, children, ...props }: UserChipProps) => {
    const name = user.username
    const description = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(user.creationDate)

    return (
        <EntityChip
            name={name}
            description={description}
            avatar={<UserAvatar user={user}/>}
            {...props}>
            {children}
        </EntityChip>
    );
}

export default UserChip;