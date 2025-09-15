import React, { HTMLAttributes } from 'react';
import { Rank } from '../../../model/Rank.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { TextField } from '@mui/material';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import ColorField from '../../../../../components/colorField/ColorField';
import { DEFAULT_COLOR } from '../../../../../components/entityAvatar/EntityAvatar';

export interface RankCardContentProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
    onRankChange: (rank: Rank) => void
    mode: Mode
}

const RankCardContent = ({ rank, onRankChange, mode, ...props }: RankCardContentProps) => {
    const editable = mode === Mode.EDIT

    const properties = [
        <TextField
            label="Title"
            type="text"
            value={rank.title || ""}
            onChange={e => editable ? onRankChange({...rank, title: e.target.value}) : null}/>,
        <TextField
            label="Description"
            type="text"
            multiline
            rows={3}
            value={rank.description || ""}
            onChange={e => editable ? onRankChange({...rank, description: e.target.value}) : null}/>,
        <TextField
            label="Image URL"
            type="url"
            value={rank.imageUrl || ""}
            onChange={e => editable ? onRankChange({...rank, imageUrl: e.target.value}) : null}/>,
        <ColorField
            disabled={!editable}
            label="Color"
            value={rank.color || DEFAULT_COLOR}
            onChange={(color) => editable ? onRankChange({...rank, color}) : null}/>
    ]

    return <EntityCardContent properties={properties} {...props}/>
}

export default RankCardContent;