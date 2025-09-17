import React, { HTMLAttributes } from 'react';
import { Option } from '../../model/Option.types';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';
import SegmentIcon from '@mui/icons-material/Segment';

export interface OptionAvatarProps extends HTMLAttributes<HTMLDivElement> {
    option: Option
}

const OptionAvatar = ({ option, ...props }: OptionAvatarProps) => {
    return (
        <EntityAvatar
            imageUrl={option.imageUrl}
            Icon={SegmentIcon}
            avatarColor={option.color}
            {...props}/>
    )
}

export default OptionAvatar;