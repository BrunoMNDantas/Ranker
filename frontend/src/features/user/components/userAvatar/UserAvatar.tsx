import { HTMLAttributes } from 'react';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';
import UserIcon from '../userIcon/UserIcon';
import { useAppSelector } from '../../../../app/hooks';
import { selectUserById } from '../../store/User.selectors';

export interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
    userId: string
}

const UserAvatar = ({ userId, ...props }: UserAvatarProps) => {
    const user = useAppSelector(state => selectUserById(state, userId))

    if(!user) {
        return null
    }

    return (
        <EntityAvatar
            imageUrl={user.imageUrl}
            Icon={UserIcon}
            avatarColor={user.color}
            {...props}/>
    )
}

export default UserAvatar;