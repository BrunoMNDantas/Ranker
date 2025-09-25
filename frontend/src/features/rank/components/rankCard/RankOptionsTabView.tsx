import React, { useState } from 'react';
import { Option } from '../../../option/model/Option.types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appOptionRoute } from '../../../../app/Routes';
import ActionButton from '../../../../components/actionButton/ActionButton';
import { IconButton } from '@mui/material';
import EntitySortableList from '../../../../components/entitySortableList/EntitySortableList';
import OptionChip from '../../../option/components/optionChip/OptionChip';

export interface RankOptionsTabViewProps {
    options: Option[]
    onOptionsChange: (options: Option[]) => void
    editMode: boolean
    onDeleteOption: (option: Option) => Promise<void>
}

export const RankOptionsTabView = ({ options, onOptionsChange, editMode, onDeleteOption }: RankOptionsTabViewProps) => {
    const [sortedOptions, setSortedOptions] = useState(options.sort((a, b) => a.order! - b.order!))

    const handleDelete = async (e: React.MouseEvent, option: Option) => {
        e.preventDefault()
        await onDeleteOption(option)
    }

    const handleOptionsChange = (options: Option[]) => {
        options.forEach((option, index) => option.order = index)
        setSortedOptions(options)
        onOptionsChange(options)
    }

    return (
        <EntitySortableList
            entities={sortedOptions}
            onEntitiesChange={handleOptionsChange}
            entityRenderer={option => (
                <OptionChip option={option}>
                    <IconButton href={appOptionRoute(option.id!)} color='info' size='small'>
                        <VisibilityIcon fontSize='small' />
                    </IconButton>
                    <ActionButton buttonAction={e => handleDelete(e, option)} color='error' size='small' disabled={!editMode}>
                        <ClearIcon fontSize='small' />
                    </ActionButton>
                </OptionChip>
            )}/>
    )
}

export default RankOptionsTabView;