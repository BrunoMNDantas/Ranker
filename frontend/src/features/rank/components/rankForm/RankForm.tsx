import React, { HTMLAttributes } from 'react';
import { Rank } from '../../model/Rank.types';
import { TextField } from '@mui/material';
import { Mode } from '../../../../components/entityCard/EntityCard';
import ColorField from '../../../../components/colorField/ColorField';
import EntityCardForm from '../../../../components/entityCard/entityCardForm/EntityCardForm';

export interface RankFormProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
    onRankChange: (rank: Rank) => void
    mode: Mode
}

const RankForm = ({ rank, onRankChange, mode, ...props }: RankFormProps) => {
    const editable = mode === Mode.EDIT

    return (
        <EntityCardForm {...props}>
            <TextField
                label="Title"
                type="text"
                value={rank.title}
                onChange={e => editable ? onRankChange({...rank, title: e.target.value}) : null}/>
            <TextField
                label="Description"
                type="text"
                multiline
                rows={3}
                value={rank.description || ""}
                onChange={e => editable ? onRankChange({...rank, description: e.target.value}) : null}/>
            <TextField
                label="Image URL"
                type="url"
                value={rank.imageUrl || ""}
                onChange={e => editable ? onRankChange({...rank, imageUrl: e.target.value}) : null}/>
            <ColorField
                disabled={!editable}
                label="Color"
                value={rank.color}
                onChange={(color) => editable ? onRankChange({...rank, color}) : null}/>
        </EntityCardForm>
    )
}

export default RankForm;