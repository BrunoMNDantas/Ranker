import React, { HTMLAttributes } from 'react';
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

export interface RankCardContentProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
    tiers: Tier[]
    options: Option[]
    votes: Vote[]
    onRankChange: (rank: Rank) => void
    mode: Mode
}

const RankCardContent = ({ rank, tiers, options, votes, onRankChange, mode, ...props }: RankCardContentProps) => {
    const tabs = [
        {
            icon: <RankIcon/>,
            label: "Rank",
            view: <RankCardForm rank={rank} onRankChange={onRankChange} mode={mode}/>
        },
        {
            icon: <TierIcon/>,
            label: "Tiers",
            view: <TiersFilteredList tiers={tiers} tierUrl={tier => appTierRoute(tier.id!)}/>
        },
        {
            icon: <OptionIcon/>,
            label: "Options",
            view: <OptionsFilteredList options={options} optionUrl={option => appOptionRoute(option.id!)}/>
        },
        {
            icon: <VoteIcon/>,
            label: "Votes",
            view: <VotesList votes={votes} voteUrl={vote => appVoteRoute(vote.id!)}/>
        }
    ]

    return <EntityCardContent tabs={tabs} {...props}/>
}

export default RankCardContent;