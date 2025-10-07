import React, { HTMLAttributes } from 'react';
import EntityChip from '../../../../components/entityChip/EntityChip';
import UserAvatar from '../userAvatar/UserAvatar';
import { useAppSelector } from '../../../../app/hooks';
import { selectUserById } from '../../store/User.selectors';

export interface UserChipProps extends HTMLAttributes<HTMLDivElement> {
    userId: string
}

const UserChip = ({ userId, children, ...props }: UserChipProps) => {
    const user = useAppSelector(state => selectUserById(state, userId))

    if(!user) {
        return null
    }

    const name = user.username
    const description = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(user.creationDate)

    return (
        <EntityChip
            name={name}
            description={description}
            avatar={<UserAvatar userId={user.id}/>}
            {...props}>
            {children}
        </EntityChip>
    );
}

export default UserChip;