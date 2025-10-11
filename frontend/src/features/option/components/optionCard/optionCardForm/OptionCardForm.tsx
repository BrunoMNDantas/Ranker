import React, { HTMLAttributes } from 'react';
import { Option } from '../../../model/Option.types';
import { TextField } from '@mui/material';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import ColorField from '../../../../../components/colorField/ColorField';
import EntityCardForm from '../../../../../components/entityCard/entityCardForm/EntityCardForm';

export interface OptionCardFormProps extends HTMLAttributes<HTMLDivElement> {
    option: Option
    onOptionChange: (option: Option) => void
    mode: Mode
}

const OptionCardForm = ({ option, onOptionChange, mode, ...props }: OptionCardFormProps) => {
    const editable = mode === Mode.EDIT

    return (
        <EntityCardForm {...props}>
            <TextField
                label="Title"
                type="text"
                value={option.title}
                onChange={e => editable ? onOptionChange({...option, title: e.target.value}) : null}/>
            <TextField
                label="Description"
                type="text"
                multiline
                rows={3}
                value={option.description || ""}
                onChange={e => editable ? onOptionChange({...option, description: e.target.value}) : null}/>
            <TextField
                label="Image URL"
                type="url"
                value={option.imageUrl || ""}
                onChange={e => editable ? onOptionChange({...option, imageUrl: e.target.value}) : null}/>
            <ColorField
                disabled={!editable}
                label="Color"
                value={option.color}
                onChange={(color) => editable ? onOptionChange({...option, color}) : null}/>
        </EntityCardForm>
    )
}

export default OptionCardForm;