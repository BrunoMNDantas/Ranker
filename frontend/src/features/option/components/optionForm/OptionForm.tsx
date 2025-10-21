import { HTMLAttributes } from 'react';
import { TextField } from '@mui/material';
import { Mode } from '../../../../components/entityCard/EntityCard';
import ColorField from '../../../../components/colorField/ColorField';
import EntityCardForm from '../../../../components/entityCard/entityCardForm/EntityCardForm';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { selectOptionById } from '../../store/Option.selectors';
import { updateOption } from '../../store/Option.slice';

export interface OptionFormProps extends HTMLAttributes<HTMLDivElement> {
    optionId: string
    mode: Mode
}

const OptionForm = ({ optionId, mode, ...props }: OptionFormProps) => {
    const dispatch = useAppDispatch()
    const option = useAppSelector((state) => selectOptionById(state, optionId))
    const editable = mode === Mode.EDIT

    if (!option) {
        return null
    }

    const handleFieldChange = (changes: Partial<typeof option>) => {
        if (editable) {
            dispatch(updateOption({ id: optionId, changes }))
        }
    }

    return (
        <EntityCardForm {...props}>
            <TextField
                label="Title"
                type="text"
                value={option.title}
                onChange={e => handleFieldChange({ title: e.target.value })}
                data-testid="option-title-input"/>
            <TextField
                label="Description"
                type="text"
                multiline
                rows={3}
                value={option.description || ""}
                onChange={e => handleFieldChange({ description: e.target.value })}
                data-testid="option-description-input"/>
            <TextField
                label="Image URL"
                type="url"
                value={option.imageUrl || ""}
                onChange={e => handleFieldChange({ imageUrl: e.target.value })}
                data-testid="option-image-url-input"/>
            <ColorField
                disabled={!editable}
                label="Color"
                value={option.color}
                onChange={color => handleFieldChange({ color })}/>
        </EntityCardForm>
    )
}

export default OptionForm;