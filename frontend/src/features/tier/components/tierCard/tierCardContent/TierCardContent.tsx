import React, { HTMLAttributes } from 'react';
import { Tier } from '../../../model/Tier.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { TextField } from '@mui/material';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import ColorField from '../../../../../components/colorField/ColorField';
import { DEFAULT_COLOR } from '../../../../../components/entityAvatar/EntityAvatar';

export interface TierCardContentProps extends HTMLAttributes<HTMLDivElement> {
    tier: Tier
    onTierChange: (tier: Tier) => void
    mode: Mode
}

const TierCardContent = ({ tier, onTierChange, mode, ...props }: TierCardContentProps) => {
    const editable = mode === Mode.EDIT

    const properties = [
        <TextField
            label="Title"
            type="text"
            value={tier.title || ""}
            onChange={e => editable ? onTierChange({...tier, title: e.target.value}) : null}/>,
        <TextField
            label="Description"
            type="text"
            multiline
            rows={3}
            value={tier.description || ""}
            onChange={e => editable ? onTierChange({...tier, description: e.target.value}) : null}/>,
        <TextField
            label="Image URL"
            type="url"
            value={tier.imageUrl || ""}
            onChange={e => editable ? onTierChange({...tier, imageUrl: e.target.value}) : null}/>,
        <ColorField
            disabled={!editable}
            label="Color"
            value={tier.color || DEFAULT_COLOR}
            onChange={color => editable ? onTierChange({...tier, color}) : null}/>
    ]

    return <EntityCardContent properties={properties} {...props}/>
}

export default TierCardContent;