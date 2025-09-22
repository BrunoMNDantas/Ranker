import React from 'react';
import { BadgeProps } from '@mui/material';
import EntityCreateIcon from '../../../../components/entityCreateIcon/EntityCreateIcon';
import TierIcon from '../tierIcon/TierIcon';

const TierCreateIcon = (props: BadgeProps) => {
    return <EntityCreateIcon icon={<TierIcon/>} {...props}/>
}

export default TierCreateIcon;