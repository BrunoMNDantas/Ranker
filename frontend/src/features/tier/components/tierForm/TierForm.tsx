import { HTMLAttributes } from 'react';
import { TextField } from '@mui/material';
import { Mode } from '../../../../components/entityCard/EntityCard';
import ColorField from '../../../../components/colorField/ColorField';
import EntityCardForm from '../../../../components/entityCard/entityCardForm/EntityCardForm';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { selectTierById } from '../../store/Tier.selectors';
import { updateTier } from '../../store/Tier.slice';

export interface TierFormProps extends HTMLAttributes<HTMLDivElement> {
    tierId: string
    mode: Mode
}

const TierForm = ({ tierId, mode, ...props }: TierFormProps) => {
    const dispatch = useAppDispatch()
    const tier = useAppSelector((state) => selectTierById(state, tierId))
    const editable = mode === Mode.EDIT

    if (!tier) {
        return null
    }

    const handleFieldChange = (changes: Partial<typeof tier>) => {
        if (editable) {
            dispatch(updateTier({ id: tierId, changes }))
        }
    }

    return (
        <EntityCardForm {...props}>
            <TextField
                label="Title"
                type="text"
                value={tier.title}
                onChange={e => handleFieldChange({ title: e.target.value })}/>
            <TextField
                label="Description"
                type="text"
                multiline
                rows={3}
                value={tier.description || ""}
                onChange={e => handleFieldChange({ description: e.target.value })}/>
            <TextField
                label="Image URL"
                type="url"
                value={tier.imageUrl || ""}
                onChange={e => handleFieldChange({ imageUrl: e.target.value })}/>
            <ColorField
                disabled={!editable}
                label="Color"
                value={tier.color}
                onChange={color => handleFieldChange({ color })}/>
        </EntityCardForm>
    )
}

export default TierForm;