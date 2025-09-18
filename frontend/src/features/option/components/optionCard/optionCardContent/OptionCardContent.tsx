import React, { HTMLAttributes } from 'react';
import { Option } from '../../../model/Option.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { TextField } from '@mui/material';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import ColorField from '../../../../../components/colorField/ColorField';

export interface OptionCardContentProps extends HTMLAttributes<HTMLDivElement> {
    option: Option
    onOptionChange: (option: Option) => void
    mode: Mode
}

const OptionCardContent = ({ option, onOptionChange, mode, ...props }: OptionCardContentProps) => {
    const editable = mode === Mode.EDIT

    const properties = [
        <TextField
            label="Title"
            type="text"
            value={option.title || ""}
            onChange={e => editable ? onOptionChange({...option, title: e.target.value}) : null}/>,
        <TextField
            label="Description"
            type="text"
            multiline
            rows={3}
            value={option.description || ""}
            onChange={e => editable ? onOptionChange({...option, description: e.target.value}) : null}/>,
        <TextField
            label="Image URL"
            type="url"
            value={option.imageUrl || ""}
            onChange={e => editable ? onOptionChange({...option, imageUrl: e.target.value}) : null}/>,
        <ColorField
            disabled={!editable}
            label="Color"
            value={option.color}
            onChange={(color) => editable ? onOptionChange({...option, color}) : null}/>
    ]

    return <EntityCardContent properties={properties} {...props}/>
}

export default OptionCardContent;