import React, { HTMLAttributes } from 'react';
import { Option } from '../../../model/Option.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { TextField } from '@mui/material';

export interface OptionCardContentProps extends HTMLAttributes<HTMLDivElement> {
    option: Option
    onOptionChange: (option: Option) => void
}

const OptionCardContent = ({ option, onOptionChange, ...props }: OptionCardContentProps) => {
    const properties = [
        <TextField
            label="Title"
            type="text"
            value={option.title || ""}
            onChange={e => onOptionChange({...option, title: e.target.value})}/>,
        <TextField
            label="Description"
            type="text"
            multiline
            rows={3}
            value={option.description || ""}
            onChange={e => onOptionChange({...option, description: e.target.value})}/>,
        <TextField
            label="Image URL"
            type="url"
            value={option.imageUrl || ""}
            onChange={e => onOptionChange({...option, imageUrl: e.target.value})}/>
    ]

    return <EntityCardContent properties={properties} {...props}/>
}

export default OptionCardContent;