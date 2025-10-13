import { useMemo, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { selectOptionsOfRank } from '../../../../option/store/Option.selectors';
import { createOptionThunk, updateOptionThunk, deleteOptionThunk } from '../../../../option/store/Option.thunks';
import { addOption, deleteOption } from '../../../../option/store/Option.slice';
import OptionFormModal from '../../../../option/components/optionFormModal/OptionFormModal';
import { createOption } from '../../../../../services/EntityFactory.service';

export interface RankOptionsPanelProps {
    rankId: string
    mode: Mode
}

export const RankOptionsPanel = ({ rankId, mode }: RankOptionsPanelProps) => {
    const dispatch = useAppDispatch()
    const options = useAppSelector((state) => selectOptionsOfRank(state, rankId))
    const [executing, setExecuting] = useState(false)
    const [tempOptionId, setTempOptionId] = useState<string | null>(null)
    const editMode = mode === Mode.EDIT

    const sortedOptions = useMemo(() =>
        [...options].sort((a, b) => a.order - b.order),
        [options]
    )

    const execute = async (action: ()=>Promise<void>) => {
        setExecuting(true)
        try {
            return await action()
        } finally {
            return setExecuting(false)
        }
    }

    const handleDelete = async (option: Option) => {
        await execute(async () => {
            await dispatch(deleteOptionThunk(option.id)).unwrap()
        })
    }

    const handleOptionsChange = async (updatedOptions: Option[]) => {
        await execute(async () => {
            const optionsWithNewOrder = updatedOptions.map((option, index) => ({ ...option, order: index }))
            await Promise.all(optionsWithNewOrder.map(option => dispatch(updateOptionThunk(option)).unwrap()))
        })
    }

    const handleCreateOptionClick = async () => {
        await execute(async () => {
            const newOption = createOption({ id: crypto.randomUUID(), rankId, order: options.length })
            setTempOptionId(newOption.id)
            dispatch(addOption(newOption))
        })
    }

    const handleModalCreate = async () => {
        if (tempOptionId) {
            const option = options.find(o => o.id === tempOptionId)
            if (option) {
                await execute(async () => {
                    await dispatch(createOptionThunk(option)).unwrap()
                    setTempOptionId(null)
                })
            }
        }
    }

    const handleModalCancel = async () => {
        if (tempOptionId) {
            dispatch(deleteOption(tempOptionId))
            setTempOptionId(null)
        }
    }

    const createOptionAction: Action = {
        iconProps: { color: "info" },
        icon: <OptionCreateIcon/>,
        onClick: handleCreateOptionClick,
        disabled: executing || !editMode
    }

    return (
        <>
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
                            <ActionButton buttonAction={() => handleDelete(option)} color='error' size='small' disabled={!editMode || executing}>
                                <ClearIcon fontSize='small' />
                            </ActionButton>
                        </OptionChip>
                    )}/>
                <Divider/>
                <EntityCardActions actions={[createOptionAction]}/>
            </div>
            { tempOptionId ? <OptionFormModal optionId={tempOptionId} onCancel={handleModalCancel} onCreate={handleModalCreate}/> : null }
        </>
    )
}

export default RankOptionsPanel;
