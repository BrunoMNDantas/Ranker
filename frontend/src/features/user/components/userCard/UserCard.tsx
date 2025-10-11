import React, { HTMLAttributes, useState } from 'react';
import EntityCard from '../../../../components/entityCard/EntityCard';
import UserCardHeader from './userCardHeader/UserCardHeader';
import { Mode } from '../../../../components/entityCard/EntityCard';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import UserIcon from '../userIcon/UserIcon';
import { User } from '../../model/User.types';
import RankIcon from '../../../rank/components/rankIcon/RankIcon';
import VoteIcon from '../../../vote/components/voteIcon/VoteIcon';
import { Rank } from '../../../rank/model/Rank.types';
import { Vote } from '../../../vote/model/Vote.types';
import UserFormPanel from './userFormPanel/UserFormPanel';
import UserRanksPanel from './userRanksPanel/UserRanksPanel';
import UserVotesPanel from './userVotesPanel/UserVotesPanel';

export interface UserCardProps extends HTMLAttributes<HTMLDivElement> {
    user: User
    ranks: Rank[]
    votes: Vote[]
    mode: Mode
    onUserChange: (changedUser: User) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
    onCreateRank: () => Promise<void>
    onDeleteRank: (rank: Rank) => Promise<void>
    onDeleteVote: (vote: Vote) => Promise<void>
}

const UserCard = ({
    user, ranks, votes, mode,
    onUserChange, onClear, onSave, onDelete,
    onCreateRank, onDeleteRank, onDeleteVote,
    ...props
}: UserCardProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const tabs = [
        {
            icon: <UserIcon/>,
            label: "User",
            view: <UserFormPanel user={user} onUserChange={onUserChange} mode={mode} onClear={onClear} onSave={onSave} onDelete={onDelete}/>
        },
        {
            label: "Ranks",
            icon: <RankIcon/>,
            view: <UserRanksPanel ranks={ranks} mode={mode} onDeleteRank={onDeleteRank} onCreateRank={onCreateRank}/>
        },
        {
            label: "Votes",
            icon: <VoteIcon/>,
            view: <UserVotesPanel votes={votes} mode={mode} onDeleteVote={onDeleteVote}/>
        }
    ]

    return (
        <EntityCard {...props}>
            <UserCardHeader user={user}/>
            <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs}/>
        </EntityCard>
    )
}

export default UserCard;