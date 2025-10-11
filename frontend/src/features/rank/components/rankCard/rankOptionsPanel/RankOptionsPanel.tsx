import React, { useState } from 'react';
import classes from './RankOptionsPanel.module.css'
import { Option } from '../../../../option/model/Option.types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { appOptionRoute } from '../../../../../app/Routes';
import ActionButton from '../../../../../components/actionButton/ActionButton';
import { IconButton, Divider } from '@mui/material';
import EntitySortableList from '../../../../../components/entitySortableList/EntitySortableList';
import OptionChip from '../../../../option/components/optionChip/OptionChip';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import EntityCardActions, { Action } from '../../../../../components/entityCard/entityCardActions/EntityCardActions';
import OptionCreateIcon from '../../../../option/components/optionCreateIcon/OptionCreateIcon';

export interface RankOptionsPanelProps {
    options: Option[]
    mode: Mode
    onOptionsChange: (options: Option[]) => void
    onDeleteOption: (option: Option) => Promise<void>
    onCreateOption: () => Promise<void>
}

export const RankOptionsPanel = ({ options, mode, onOptionsChange, onDeleteOption, onCreateOption }: RankOptionsPanelProps) => {
    const [sortedOptions, setSortedOptions] = useState(options.sort((a, b) => a.order - b.order))
    const [executing, setExecuting] = useState(false)
    const editMode = mode === Mode.EDIT

    const execute = async (action: ()=>Promise<void>) => {
        setExecuting(true)
        try {
            return await action()
        } finally {
            return setExecuting(false)
        }
    }

    const handleDelete = async (option: Option) => {
        await onDeleteOption(option)
    }

    const handleOptionsChange = (options: Option[]) => {
        options.forEach((option, index) => option.order = index)
        setSortedOptions(options)
        onOptionsChange(options)
    }

    const handleCreateOption = () => execute(onCreateOption)

    const createOptionAction: Action = {
        iconProps: { color: "info" },
        icon: <OptionCreateIcon/>,
        onClick: handleCreateOption,
        disabled: executing || !editMode
    }

    return (
        <div className={classes.root}>
            <EntitySortableList
                disabled={!editMode}
                entities={sortedOptions}
                onEntitiesChange={handleOptionsChange}
                entityRenderer={option => (
                    <OptionChip optionId={option.id}>
                        <IconButton href={appOptionRoute(option.id)} color='info' size='small'>
                            <VisibilityIcon fontSize='small' />
                        </IconButton>
                        <ActionButton buttonAction={e => handleDelete(option)} color='error' size='small' disabled={!editMode}>
                            <ClearIcon fontSize='small' />
                        </ActionButton>
                    </OptionChip>
                )}/>
            <Divider/>
            <EntityCardActions actions={[createOptionAction]}/>
        </div>
    )
}

export default RankOptionsPanel;
