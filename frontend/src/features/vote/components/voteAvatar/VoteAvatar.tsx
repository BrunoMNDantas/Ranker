import React, { HTMLAttributes } from 'react';
import { Vote } from '../../model/Vote.types';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

export interface VoteAvatarProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
}

const VoteAvatar = ({ vote, ...props }: VoteAvatarProps) => {
    return <EntityAvatar Icon={HowToVoteIcon} {...props}/>
}

export default VoteAvatar;