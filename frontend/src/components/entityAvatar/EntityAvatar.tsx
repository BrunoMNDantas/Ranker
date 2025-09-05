import React, { HTMLAttributes } from 'react';
import classes from './EntityAvatar.module.css';

export interface EntityAvatarProps extends HTMLAttributes<HTMLDivElement> {
    imageUrl: string
}

const EntityAvatar = ({ imageUrl, ...props }: EntityAvatarProps) => {
    const className = props.className ? props.className : classes.root

    return (
        <div className={className} {...props}>
            <img className={classes.image} src={imageUrl}/>
        </div>
    );
}

export default EntityAvatar;