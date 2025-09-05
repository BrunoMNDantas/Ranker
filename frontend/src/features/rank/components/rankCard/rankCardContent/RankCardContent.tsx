import React, { HTMLAttributes } from 'react';
import { Rank } from '../../../model/Rank.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { TextField } from '@mui/material';

export interface RankCardContentProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
    onRankChange: (rank: Rank) => void
}

const RankCardContent = ({ rank, onRankChange, ...props }: RankCardContentProps) => {
    const properties = [
        <TextField
            label="Title"
            type="text"
            value={rank.title || ""}
            onChange={e => onRankChange({...rank, title: e.target.value})}/>,
        <TextField
            label="Description"
            type="text"
            multiline
            rows={3}
            value={rank.description || ""}
            onChange={e => onRankChange({...rank, description: e.target.value})}/>,
        <TextField
            label="Image URL"
            type="url"
            value={rank.imageUrl || ""}
            onChange={e => onRankChange({...rank, imageUrl: e.target.value})}/>
    ]

    return <EntityCardContent properties={properties} {...props}/>
}

export default RankCardContent;