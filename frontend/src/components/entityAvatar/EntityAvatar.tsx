import React, { HTMLAttributes } from 'react';
import classes from './EntityAvatar.module.css';
import { SvgIconProps } from '@mui/material';

export const DEFAULT_COLOR = "#bbbbbbff"

export interface EntityAvatarProps extends HTMLAttributes<HTMLDivElement> {
    imageUrl?: string | null
    avatarColor?: string | null
    Icon: React.ComponentType<SvgIconProps>
}

const EntityAvatar = ({ imageUrl, avatarColor, Icon, ...props }: EntityAvatarProps) => {
    const className = props.className || classes.root
    const color = avatarColor || DEFAULT_COLOR

    return (
        <div className={className} style={{border: "solid 3px " + color}} {...props}>
            {
                imageUrl ?
                    <img className={classes.image} src={imageUrl}/> :
                    <Icon className={classes.icon}/>
            }
        </div>
    );
}

export default EntityAvatar;