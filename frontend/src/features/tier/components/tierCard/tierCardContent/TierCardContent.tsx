import React, { HTMLAttributes } from 'react';
import { Tier } from '../../../model/Tier.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { TextField } from '@mui/material';

export interface TierCardContentProps extends HTMLAttributes<HTMLDivElement> {
    tier: Tier
    onTierChange: (tier: Tier) => void
}

const TierCardContent = ({ tier, onTierChange, ...props }: TierCardContentProps) => {
    const properties = [
        <TextField
            label="Title"
            type="text"
            value={tier.title || ""}
            onChange={e => onTierChange({...tier, title: e.target.value})}/>,
        <TextField
            label="Description"
            type="text"
            multiline
            rows={3}
            value={tier.description || ""}
            onChange={e => onTierChange({...tier, description: e.target.value})}/>,
        <TextField
            label="Image URL"
            type="url"
            value={tier.imageUrl || ""}
            onChange={e => onTierChange({...tier, imageUrl: e.target.value})}/>
    ]

    return <EntityCardContent properties={properties} {...props}/>
}

export default TierCardContent;