import React, { HTMLAttributes, useState } from 'react';
import { Rank } from '../../model/Rank.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import RankCardHeader from './rankCardHeader/RankCardHeader';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { Tier } from '../../../tier/model/Tier.types';
import { Option } from '../../../option/model/Option.types';
import { Vote } from '../../../vote/model/Vote.types';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import VoteIcon from '../../../vote/components/voteIcon/VoteIcon';
import OptionIcon from '../../../option/components/optionIcon/OptionIcon';
import TierIcon from '../../../tier/components/tierIcon/TierIcon';
import RankIcon from '../rankIcon/RankIcon';
import RankTiersPanel from './rankTiersPanel/RankTiersPanel';
import RankOptionsPanel from './rankOptionsPanel/RankOptionsPanel';
import RankVotesPanel from './rankVotesPanel/RankVotesPanel';
import RankFormPanel from './rankFormPanel/RankFormPanel';
import { useNavigate } from 'react-router-dom';
import { appRankVoteRoute } from '../../../../app/Routes';

export interface RankCardProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
    tiers: Tier[]
    options: Option[]
    votes: Vote[]
    mode: Mode
    onRankChange: (changedRank: Rank) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
    onCreateTier: () => Promise<void>
    onTierChange: (tier: Tier) => Promise<void>
    onDeleteTier: (tier: Tier) => Promise<void>
    onCreateOption: () => Promise<void>
    onOptionChange: (option: Option) => Promise<void>
    onDeleteOption: (option: Option) => Promise<void>
    onDeleteVote: (vote: Vote) => Promise<void>
}

const RankCard = ({
    rank, tiers, options, votes, mode,
    onRankChange, onClear, onSave, onDelete,
    onCreateTier, onTierChange, onDeleteTier,
    onCreateOption, onOptionChange, onDeleteOption,
    onDeleteVote,
    ...props
}: RankCardProps) => {
    const navigate = useNavigate()
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const handleTiersChange = async (tiers: Tier[]) => Promise.all(tiers.map(onTierChange))

    const handleOptionsChange = (options: Option[]) => Promise.all(options.map(onOptionChange))

    const handleCreateVote = () => {
        navigate(appRankVoteRoute(rank.id))
        return Promise.resolve()
    }

    const tabs = [
        {
            label: "Rank",
            icon: <RankIcon/>,
            view: <RankFormPanel rank={rank} onRankChange={onRankChange} mode={mode} onClear={onClear} onSave={onSave} onDelete={onDelete}/>
        },
        {
            label: "Tiers",
            icon: <TierIcon/>,
            view: <RankTiersPanel tiers={tiers} mode={mode} onTiersChange={handleTiersChange} onDeleteTier={onDeleteTier} onCreateTier={onCreateTier}/>
        },
        {
            label: "Options",
            icon: <OptionIcon/>,
            view: <RankOptionsPanel options={options} mode={mode} onOptionsChange={handleOptionsChange} onDeleteOption={onDeleteOption} onCreateOption={onCreateOption}/>
        },
        {
            label: "Votes",
            icon: <VoteIcon/>,
            view: <RankVotesPanel votes={votes} mode={mode} onDeleteVote={onDeleteVote} onCreateVote={handleCreateVote}/>
        }
    ]

    return (
        <EntityCard {...props}>
            <RankCardHeader rank={rank}/>
            <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs}/>
        </EntityCard>
    )
}

export default RankCard;