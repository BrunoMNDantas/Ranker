import { HTMLAttributes } from 'react';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import UserAvatar from '../../userAvatar/UserAvatar';
import EntityProperty from '../../../../../components/entityProperty/EntityProperty';
import { useAppSelector } from '../../../../../app/hooks';
import { selectUserById } from '../../../store/User.selectors';

export interface UserCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    userId: string
    showCreationDate?: boolean
}

const UserCardHeader = ({ userId, showCreationDate=true, ...props }: UserCardHeaderProps) => {
    const user = useAppSelector((state) => selectUserById(state, userId))

    if (!user) {
        return null
    }

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