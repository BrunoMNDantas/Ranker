import React from 'react';
import { BadgeProps } from '@mui/material';
import EntityCreateIcon from '../../../../components/entityCreateIcon/EntityCreateIcon';
import VoteIcon from '../voteIcon/VoteIcon';

const VoteCreateIcon = (props: BadgeProps) => {
    return <EntityCreateIcon icon={<VoteIcon/>} {...props}/>
}

export default VoteCreateIcon;