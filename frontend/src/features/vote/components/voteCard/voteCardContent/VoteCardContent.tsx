import React, { HTMLAttributes } from 'react';
import { Vote } from '../../../model/Vote.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import VoteCardForm from '../voteCardForm/VoteCardForm';
import VoteIcon from '../../voteIcon/VoteIcon';
import { Assignment } from '../../../../assignment/model/Assignment.types';
import AssignmentIcon from '../../../../assignment/components/assignmentIcon/AssignmentIcon';
import AssignmentsList from '../../../../assignment/components/assignmentsList/AssignmentsList';
import { appAssignmentRoute } from '../../../../../app/Routes';

export interface VoteCardContentProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
    assignments: Assignment[]
    onVoteChange: (vote: Vote) => void
    mode: Mode
}

const VoteCardContent = ({ vote, assignments, onVoteChange, mode, ...props }: VoteCardContentProps) => {
    const tabs = [
        {
            icon: <VoteIcon/>,
            label: "Vote",
            view: <VoteCardForm vote={vote} onVoteChange={onVoteChange} mode={mode}/>
        },
        {
            icon: <AssignmentIcon/>,
            label: "Assignments",
            view: <AssignmentsList assignments={assignments} assignmentUrl={assignment => appAssignmentRoute(assignment.id!)}/>
        }
    ]

    return <EntityCardContent tabs={tabs} {...props}/>
}

export default VoteCardContent;