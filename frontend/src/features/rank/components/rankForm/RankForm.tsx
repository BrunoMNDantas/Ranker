import { HTMLAttributes } from 'react';
import { TextField } from '@mui/material';
import { Mode } from '../../../../components/entityCard/EntityCard';
import ColorField from '../../../../components/colorField/ColorField';
import EntityCardForm from '../../../../components/entityCard/entityCardForm/EntityCardForm';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { selectRankById } from '../../store/Rank.selectors';
import { updateRank } from '../../store/Rank.slice';

export interface RankFormProps extends HTMLAttributes<HTMLDivElement> {
    rankId: string
    mode: Mode
}

const RankForm = ({ rankId, mode, ...props }: RankFormProps) => {
    const dispatch = useAppDispatch()
    const rank = useAppSelector((state) => selectRankById(state, rankId))
    const editable = mode === Mode.EDIT

    if (!rank) {
        return null
    }

    const handleFieldChange = (changes: Partial<typeof rank>) => {
        if (editable) {
            dispatch(updateRank({ id: rankId, changes }))
        }
    }

    return (
        <EntityCardForm {...props}>
            <TextField
                label="Title"
                type="text"
                value={rank.title}
                onChange={e => handleFieldChange({ title: e.target.value })}/>
            <TextField
                label="Description"
                type="text"
                multiline
                rows={3}
                value={rank.description || ""}
                onChange={e => handleFieldChange({ description: e.target.value })}/>
            <TextField
                label="Image URL"
                type="url"
                value={rank.imageUrl || ""}
                onChange={e => handleFieldChange({ imageUrl: e.target.value })}/>
            <ColorField
                disabled={!editable}
                label="Color"
                value={rank.color}
                onChange={color => handleFieldChange({ color })}/>
        </EntityCardForm>
    )
}

export default RankForm;