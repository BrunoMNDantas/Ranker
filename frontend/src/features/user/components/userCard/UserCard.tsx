import { HTMLAttributes, useState } from 'react';
import EntityCard from '../../../../components/entityCard/EntityCard';
import UserCardHeader from './userCardHeader/UserCardHeader';
import { Mode } from '../../../../components/entityCard/EntityCard';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import UserIcon from '../userIcon/UserIcon';
import RankIcon from '../../../rank/components/rankIcon/RankIcon';
import VoteIcon from '../../../vote/components/voteIcon/VoteIcon';
import UserFormPanel from './userFormPanel/UserFormPanel';
import UserRanksPanel from './userRanksPanel/UserRanksPanel';
import UserVotesPanel from './userVotesPanel/UserVotesPanel';

export interface UserCardProps extends HTMLAttributes<HTMLDivElement> {
    userId: string
    mode: Mode
}

const UserCard = ({ userId, mode, ...props }: UserCardProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const tabs = [
        {
            icon: <UserIcon/>,
            label: "User",
            view: <UserFormPanel userId={userId} mode={mode}/>
        },
        {
            label: "Ranks",
            icon: <RankIcon/>,
            view: <UserRanksPanel userId={userId} mode={mode}/>
        },
        {
            label: "Votes",
            icon: <VoteIcon/>,
            view: <UserVotesPanel userId={userId} mode={mode}/>
        }
    ]

    return (
        <EntityCard {...props}>
            <UserCardHeader userId={userId}/>
            <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs}/>
        </EntityCard>
    )
}

export default UserCard;