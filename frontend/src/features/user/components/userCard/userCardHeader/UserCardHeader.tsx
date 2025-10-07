import React, { HTMLAttributes } from 'react';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import UserAvatar from '../../userAvatar/UserAvatar';
import EntityProperty from '../../../../../components/entityProperty/EntityProperty';
import { User } from '../../../model/User.types';

export interface UserCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    user: User
    showCreationDate?: boolean
}

const UserCardHeader = ({ user, showCreationDate=true, ...props }: UserCardHeaderProps) => {
    const username = user.username
    const creationDate = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(user.creationDate)

    return (
        <EntityCardHeader avatar={<UserAvatar userId={user.id}/>} {...props}>
            <EntityProperty value={username} variant='h6'/>
            { showCreationDate ? <EntityProperty value={creationDate} variant='caption'/> : null }
        </EntityCardHeader>
    )
}

export default UserCardHeader;