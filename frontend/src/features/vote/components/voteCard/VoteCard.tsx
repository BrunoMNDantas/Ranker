import React, { HTMLAttributes, useState } from 'react';
import { Vote } from '../../model/Vote.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import VoteCardHeader from './voteCardHeader/VoteCardHeader';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { Assignment } from '../../../assignment/model/Assignment.types';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import VoteIcon from '../voteIcon/VoteIcon';
import AssignmentIcon from '../../../assignment/components/assignmentIcon/AssignmentIcon';
import VoteAssignmentsPanel from './voteAssignmentsPanel/VoteAssignmentsPanel';
import VoteFormPanel from './voteFormPanel/VoteFormPanel';

export interface VoteCardProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
    assignments: Assignment[]
    mode: Mode
    onVoteChange: (changedVote: Vote) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
    onDeleteAssignment: (assignment: Assignment) => Promise<void>
}

const VoteCard = ({ vote, assignments, mode, onVoteChange, onClear, onSave, onDelete, onDeleteAssignment, ...props }: VoteCardProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const tabs = [
        {
            icon: <VoteIcon/>,
            label: "Vote",
            view: <VoteFormPanel vote={vote} onVoteChange={onVoteChange} mode={mode} onClear={onClear} onSave={onSave} onDelete={onDelete}/>
        },
        {
            icon: <AssignmentIcon/>,
            label: "Assignments",
            view: <VoteAssignmentsPanel assignments={assignments} mode={mode} onDeleteAssignment={onDeleteAssignment}/>
        }
    ]

    return (
        <EntityCard {...props}>
            <VoteCardHeader vote={vote}/>
            <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs}/>
        </EntityCard>
    )
}

export default VoteCard;