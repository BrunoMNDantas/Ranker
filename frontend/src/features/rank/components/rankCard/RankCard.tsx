import React, { HTMLAttributes, useState } from 'react';
import { Rank } from '../../model/Rank.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import RankCardHeader from './rankCardHeader/RankCardHeader';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import RestoreIcon from '@mui/icons-material/Restore';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { Tier } from '../../../tier/model/Tier.types';
import { Option } from '../../../option/model/Option.types';
import { Vote } from '../../../vote/model/Vote.types';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import VoteIcon from '../../../vote/components/voteIcon/VoteIcon';
import VotesList from '../../../vote/components/votesList/VotesList';
import { appOptionRoute, appTierRoute, appVoteRoute } from '../../../../app/Routes';
import OptionIcon from '../../../option/components/optionIcon/OptionIcon';
import OptionsFilteredList from '../../../option/components/optionsFilteredList/OptionsFilteredList';
import TiersFilteredList from '../../../tier/components/tiersFilteredList/TiersFilteredList';
import TierIcon from '../../../tier/components/tierIcon/TierIcon';
import RankCardForm from './rankCardForm/RankCardForm';
import RankIcon from '../rankIcon/RankIcon';
import EntityCardActions, { Action } from '../../../../components/entityCard/entityCardActions/EntityCardActions';
import TierCreateIcon from '../../../tier/components/tierCreateIcon/TierCreateIcon';
import OptionCreateIcon from '../../../option/components/optionCreateIcon/OptionCreateIcon';
import ActionButton from '../../../../components/actionButton/ActionButton';

export const RankTiersTabView = ({tiers, editMode, onDeleteTier}: {tiers: Tier[], editMode: boolean, onDeleteTier: (tier: Tier)=>Promise<void>}) => {
    const handleDelete = async (e: React.MouseEvent, tier: Tier) => {
        e.preventDefault()
        await onDeleteTier(tier)
    }

    return (
        <TiersFilteredList
            tiers={tiers}
            tierUrl={tier => appTierRoute(tier.id!)}
            chipActions={tier => [
                editMode ?
                    <ActionButton buttonAction={e => handleDelete(e, tier)} color='error' size='small'>
                        <ClearIcon fontSize='small'/>
                    </ActionButton> :
                    null
            ]}/>
    )
}

export const RankOptionsTabView = ({options, editMode, onDeleteOption}: {options: Option[], editMode: boolean, onDeleteOption: (option: Option)=>Promise<void>}) => {
    const handleDelete = async (e: React.MouseEvent, option: Option) => {
        e.preventDefault()
        await onDeleteOption(option)
    }

    return (
        <OptionsFilteredList
            options={options}
            optionUrl={option => appOptionRoute(option.id!)}
            chipActions={option => [
                editMode ?
                    <ActionButton buttonAction={e => handleDelete(e, option)} color='error' size='small'>
                        <ClearIcon fontSize='small'/>
                    </ActionButton> :
                    null
            ]}/>
    )
}

export const RankVotesTabView = ({votes, editMode, onDeleteVote}: {votes: Vote[], editMode: boolean, onDeleteVote: (vote: Vote)=>Promise<void>}) => {
    const handleDelete = async (e: React.MouseEvent, vote: Vote) => {
        e.preventDefault()
        await onDeleteVote(vote)
    }

    return (
        <VotesList
            votes={votes}
            voteUrl={vote => appVoteRoute(vote.id!)}
            chipActions={vote => [
                editMode ?
                    <ActionButton buttonAction={e => handleDelete(e, vote)} color='error' size='small'>
                        <ClearIcon fontSize='small'/>
                    </ActionButton> :
                    null
            ]}/>
    )
}

export interface RankCardProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
    tiers: Tier[]
    options: Option[]
    votes: Vote[]
    mode: Mode
    onRankChange: (changedRank: Rank) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onCreateTier: () => Promise<void>
    onCreateOption: ( ) => Promise<void>
    onDelete: () => Promise<void>
    onDeleteTier: (tier: Tier) => Promise<void>
    onDeleteOption: (option: Option) => Promise<void>
    onDeleteVote: (vote: Vote) => Promise<void>
}

const RankCard = ({
    rank, tiers, options, votes, mode,
    onRankChange, onClear,
    onSave, onCreateTier, onCreateOption,
    onDelete, onDeleteTier, onDeleteOption, onDeleteVote,
    ...props
}: RankCardProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)
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

    const handleClear = () => execute(onClear)
    const handleSave = () => execute(onSave)
    const handleDelete = () => execute(onDelete)
    const handleCreateTier = () => execute(onCreateTier)
    const handleCreateOption = () => execute(onCreateOption)

    const clearAction: Action = {
        iconProps: { color: "info" },
        icon: <RestoreIcon/>,
        onClick: handleClear,
        disabled: executing || !editMode
    }

    const saveAction: Action = {
        iconProps: { color: "info" },
        icon: <SaveIcon/>,
        onClick: handleSave,
        disabled: executing || !editMode
    }

    const deleteAction: Action = {
        iconProps: { color: "error" },
        icon: <DeleteIcon/>,
        onClick: handleDelete,
        disabled: executing || !editMode
    }

    const createTierAction: Action = {
        iconProps: { color: "info" },
        icon: <TierCreateIcon/>,
        onClick: handleCreateTier,
        disabled: executing || !editMode
    }

    const createOptionAction: Action = {
        iconProps: { color: "info" },
        icon: <OptionCreateIcon/>,
        onClick: handleCreateOption,
        disabled: executing || !editMode
    }

    const tabs = [
        {
            label: "Rank",
            icon: <RankIcon/>,
            view: <RankCardForm rank={rank} onRankChange={onRankChange} mode={mode}/>,
            actions: [clearAction, saveAction, deleteAction]
        },
        {
            label: "Tiers",
            icon: <TierIcon/>,
            view: <RankTiersTabView tiers={tiers} editMode={editMode} onDeleteTier={onDeleteTier}/>,
            actions: [createTierAction]
        },
        {
            label: "Options",
            icon: <OptionIcon/>,
            view: <RankOptionsTabView options={options} editMode={editMode} onDeleteOption={onDeleteOption}/>,
            actions: [createOptionAction]
        },
        {
            label: "Votes",
            icon: <VoteIcon/>,
            view: <RankVotesTabView votes={votes} editMode={editMode} onDeleteVote={onDeleteVote}/>,
            actions: []
        }
    ]

    const cardHeader = <RankCardHeader rank={rank}/>
    const cardContent = <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs} {...props}/>
    const cardActions = <EntityCardActions actions={tabs[activeTabIndex].actions} {...props}/>

    return <EntityCard cardHeader={cardHeader} cardContent={cardContent} cardActions={cardActions} {...props}/>
}

export default RankCard;