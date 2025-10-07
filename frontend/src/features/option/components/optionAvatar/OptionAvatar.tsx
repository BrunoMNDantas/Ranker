import React, { HTMLAttributes } from 'react';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';
import OptionIcon from '../optionIcon/OptionIcon';
import { useAppSelector } from '../../../../app/hooks';
import { selectOptionById } from '../../store/Option.selectors';

export interface OptionAvatarProps extends HTMLAttributes<HTMLDivElement> {
    optionId: string
}

const OptionAvatar = ({ optionId, ...props }: OptionAvatarProps) => {
    const option = useAppSelector(state => selectOptionById(state, optionId))

    if(!option) {
        return null
    }

    return (
        <EntityAvatar
            imageUrl={option.imageUrl}
            Icon={OptionIcon}
            avatarColor={option.color}
            {...props}/>
    )
}

export default OptionAvatar;