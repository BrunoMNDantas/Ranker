import React, { HTMLAttributes, useState } from 'react';
import EntityCard from '../../../../components/entityCard/EntityCard';
import { Rank } from '../../../rank/model/Rank.types';
import { Tier } from '../../../tier/model/Tier.types';
import { Option } from '../../../option/model/Option.types';
import EntityCardActions, { Action } from '../../../../components/entityCard/entityCardActions/EntityCardActions';
import RankCardHeader from '../../../rank/components/rankCard/rankCardHeader/RankCardHeader';
import VoteCreateIcon from '../voteCreateIcon/VoteCreateIcon';
import VotingBoard from './votingBoard/VotingBoard';
import { Assignment } from '../../../assignment/model/Assignment.types';

export interface VotingCardProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
    tiers: Tier[]
    options: Option[]
    onVote: (assignments: Assignment[]) => Promise<void>
}

const VotingCard = ({ rank, tiers, options, onVote, ...props }: VotingCardProps) => {
    const [executing, setExecuting] = useState(false)
    const [assignments, setAssignments] = useState<Assignment[]>([])

    const handleVote = async () => {
        setExecuting(true)

        try {
            await onVote(assignments)
        } finally {
            setExecuting(false)
        }
    }

    const voteAction: Action = {
        iconProps: { color: "info" },
        icon: <VoteCreateIcon/>,
        onClick: handleVote,
        disabled: executing
    }

    const cardHeader = <RankCardHeader rank={rank}/>
    const cardContent = <VotingBoard tiers={tiers} options={options} assignments={assignments} onAssignmentsChange={setAssignments}/>
    const cardActions = <EntityCardActions actions={[voteAction]} {...props}/>

    return <EntityCard cardHeader={cardHeader} cardContent={cardContent} cardActions={cardActions} {...props}/>
}

export default VotingCard;