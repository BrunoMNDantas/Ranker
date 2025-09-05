import React, { HTMLAttributes } from 'react';
import { Option } from '../../model/Option.types';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';

export interface OptionAvatarProps extends HTMLAttributes<HTMLDivElement> {
    option: Option
}

const OptionAvatar = ({ option, ...props }: OptionAvatarProps) => {
    const imageUrl = option.imageUrl ? option.imageUrl : '/check.png'
    return <EntityAvatar imageUrl={imageUrl} {...props}/>;
}

export default OptionAvatar;