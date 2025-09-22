import React, { HTMLAttributes, useState } from 'react';
import { Rank } from '../../../model/Rank.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import { Tier } from '../../../../tier/model/Tier.types';
import { Option } from '../../../../option/model/Option.types';
import { Vote } from '../../../../vote/model/Vote.types';
import RankCardForm from '../rankCardForm/RankCardForm';
import RankIcon from '../../rankIcon/RankIcon';
import TierIcon from '../../../../tier/components/tierIcon/TierIcon';
import OptionIcon from '../../../../option/components/optionIcon/OptionIcon';
import VoteIcon from '../../../../vote/components/voteIcon/VoteIcon';
import TiersFilteredList from '../../../../tier/components/tiersFilteredList/TiersFilteredList';
import OptionsFilteredList from '../../../../option/components/optionsFilteredList/OptionsFilteredList';
import VotesList from '../../../../vote/components/votesList/VotesList';
import { appOptionRoute, appTierRoute, appVoteRoute } from '../../../../../app/Routes';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';

export interface RankCardContentProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
    tiers: Tier[]
    options: Option[]
    votes: Vote[]
    mode: Mode
    onRankChange: (rank: Rank) => void
    onDeleteTier: (tier: Tier) => Promise<void>
    onDeleteOption: (option: Option) => Promise<void>
    onDeleteVote: (vote: Vote) => Promise<void>
}

const RankCardContent = ({
    rank, tiers, options, votes, mode,
    onRankChange, onDeleteTier, onDeleteOption, onDeleteVote,
    ...props
}: RankCardContentProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const editMode = mode === Mode.EDIT

    const tabs = [
        {
            icon: <RankIcon/>,
            label: "Rank",
            view: <RankCardForm rank={rank} onRankChange={onRankChange} mode={mode}/>
        },
        {
            icon: <TierIcon/>,
            label: "Tiers",
            view: (
                <TiersFilteredList
                    tiers={tiers}
                    tierUrl={tier => appTierRoute(tier.id!)}
                    chipActions={tier => [
                        editMode ?
                             <IconButton
                                color="error"
                                onClick={e => {
                                    e.preventDefault()
                                    onDeleteTier(tier)
                                }}
                                size='small'>
                                <ClearIcon/>
                            </IconButton> :
                        null
                    ]}/>
            )
        },
        {
            icon: <OptionIcon/>,
            label: "Options",
            view: (
                <OptionsFilteredList
                    options={options}
                    optionUrl={option => appOptionRoute(option.id!)}
                    chipActions={option => [
                        editMode ?
                             <IconButton
                                color="error"
                                onClick={e => {
                                    e.preventDefault()
                                    onDeleteOption(option)
                                }}
                                size='small'>
                                <ClearIcon/>
                            </IconButton> :
                            null
                    ]}/>
            )
        },
        {
            icon: <VoteIcon/>,
            label: "Votes",
            view: (
                <VotesList
                    votes={votes}
                    voteUrl={vote => appVoteRoute(vote.id!)}
                    chipActions={vote => [
                        editMode ?
                             <IconButton
                                color="error"
                                onClick={e => {
                                    e.preventDefault()
                                    onDeleteVote(vote)
                                }}
                                size='small'>
                                <ClearIcon/>
                            </IconButton> :
                            null
                    ]}/>
            )
        }
    ]

    return <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs} {...props}/>
}

export default RankCardContent;