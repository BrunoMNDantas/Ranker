import React, { HTMLAttributes } from 'react';
import classes from './EntityAvatar.module.css';

export const DEFAULT_COLOR = "#bbbbbbff"

export interface EntityAvatarProps extends HTMLAttributes<HTMLDivElement> {
    imageUrl: string
    avatarColor: string | null
}

const EntityAvatar = ({ imageUrl, avatarColor, ...props }: EntityAvatarProps) => {
    const className = props.className ? props.className : classes.root
    const color = avatarColor || DEFAULT_COLOR

    return (
        <div className={className} style={{border: "solid 3px " + color}} {...props}>
            <img className={classes.image} src={imageUrl}/>
        </div>
    );
}

export default EntityAvatar;