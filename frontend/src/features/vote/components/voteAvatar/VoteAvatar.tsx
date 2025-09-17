import React, { HTMLAttributes } from 'react';
import { Vote } from '../../model/Vote.types';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';
import VoteIcon from '../voteIcon/VoteIcon';

export interface VoteAvatarProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
}

const VoteAvatar = ({ vote, ...props }: VoteAvatarProps) => {
    return <EntityAvatar Icon={VoteIcon} {...props}/>
}

export default VoteAvatar;