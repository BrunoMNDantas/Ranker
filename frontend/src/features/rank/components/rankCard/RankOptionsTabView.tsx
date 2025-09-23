import React from 'react';
import { Option } from '../../../option/model/Option.types';
import OptionsFilteredList from '../../../option/components/optionsFilteredList/OptionsFilteredList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appOptionRoute } from '../../../../app/Routes';
import ActionButton from '../../../../components/actionButton/ActionButton';
import { IconButton } from '@mui/material';

export interface RankOptionsTabViewProps {
    options: Option[]
    editMode: boolean
    onDeleteOption: (option: Option) => Promise<void>
}

export const RankOptionsTabView = ({ options, editMode, onDeleteOption }: RankOptionsTabViewProps) => {
    const sortedOptions = options.sort((a, b) => a.order! - b.order!)

    const handleDelete = async (e: React.MouseEvent, option: Option) => {
        e.preventDefault()
        await onDeleteOption(option)
    }

    return (
        <OptionsFilteredList
            options={sortedOptions}
            chipActions={option => [
                <IconButton href={appOptionRoute(option.id!)} color='info' size='small'>
                    <VisibilityIcon fontSize='small' />
                </IconButton>,
                editMode ?
                    <ActionButton buttonAction={e => handleDelete(e, option)} color='error' size='small'>
                        <ClearIcon fontSize='small' />
                    </ActionButton> :
                    null
            ]} />
    )
}

export default RankOptionsTabView;