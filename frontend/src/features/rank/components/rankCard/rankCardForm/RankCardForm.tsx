import React, { HTMLAttributes } from 'react';
import { Rank } from '../../../model/Rank.types';
import { TextField } from '@mui/material';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import ColorField from '../../../../../components/colorField/ColorField';
import EntityCardForm from '../../../../../components/entityCard/entityCardForm/EntityCardForm';

export interface RankCardFormProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
    onRankChange: (rank: Rank) => void
    mode: Mode
}

const RankCardForm = ({ rank, onRankChange, mode, ...props }: RankCardFormProps) => {
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
            value={rank.color}
            onChange={(color) => editable ? onRankChange({...rank, color}) : null}/>
    ]

    return <EntityCardForm properties={properties} {...props}/>
}

export default RankCardForm;