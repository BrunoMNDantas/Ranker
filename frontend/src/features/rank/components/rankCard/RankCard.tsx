import { HTMLAttributes, useState } from 'react';
import EntityCard from '../../../../components/entityCard/EntityCard';
import RankCardHeader from './rankCardHeader/RankCardHeader';
import { Mode } from '../../../../components/entityCard/EntityCard';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import VoteIcon from '../../../vote/components/voteIcon/VoteIcon';
import OptionIcon from '../../../option/components/optionIcon/OptionIcon';
import TierIcon from '../../../tier/components/tierIcon/TierIcon';
import RankIcon from '../rankIcon/RankIcon';
import RankTiersPanel from './rankTiersPanel/RankTiersPanel';
import RankOptionsPanel from './rankOptionsPanel/RankOptionsPanel';
import RankVotesPanel from './rankVotesPanel/RankVotesPanel';
import RankFormPanel from './rankFormPanel/RankFormPanel';

export interface RankCardProps extends HTMLAttributes<HTMLDivElement> {
    rankId: string
    mode: Mode
}

const RankCard = ({ rankId, mode, ...props }: RankCardProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const tabs = [
        {
            label: "Rank",
            icon: <RankIcon/>,
            view: <RankFormPanel rankId={rankId} mode={mode}/>,
            testId: "rank-tab"
        },
        {
            label: "Tiers",
            icon: <TierIcon/>,
            view: <RankTiersPanel rankId={rankId} mode={mode}/>,
            testId: "rank-tiers-tab"
        },
        {
            label: "Options",
            icon: <OptionIcon/>,
            view: <RankOptionsPanel rankId={rankId} mode={mode}/>,
            testId: "rank-options-tab"
        },
        {
            label: "Votes",
            icon: <VoteIcon/>,
            view: <RankVotesPanel rankId={rankId} mode={mode}/>,
            testId: "rank-votes-tab"
        }
    ]

    return (
        <EntityCard {...props}>
            <RankCardHeader rankId={rankId}/>
            <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs}/>
        </EntityCard>
    )
}

export default RankCard;