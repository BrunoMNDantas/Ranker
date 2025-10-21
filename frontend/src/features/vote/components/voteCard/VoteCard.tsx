import { HTMLAttributes, useState } from 'react';
import EntityCard from '../../../../components/entityCard/EntityCard';
import VoteCardHeader from './voteCardHeader/VoteCardHeader';
import { Mode } from '../../../../components/entityCard/EntityCard';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import VoteIcon from '../voteIcon/VoteIcon';
import AssignmentIcon from '../../../assignment/components/assignmentIcon/AssignmentIcon';
import VoteAssignmentsPanel from './voteAssignmentsPanel/VoteAssignmentsPanel';
import VoteFormPanel from './voteFormPanel/VoteFormPanel';

export interface VoteCardProps extends HTMLAttributes<HTMLDivElement> {
    voteId: string
    mode: Mode
}

const VoteCard = ({ voteId, mode, ...props }: VoteCardProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const tabs = [
        {
            icon: <VoteIcon/>,
            label: "Vote",
            view: <VoteFormPanel voteId={voteId} mode={mode}/>,
            testId: "vote-tab"
        },
        {
            icon: <AssignmentIcon/>,
            label: "Assignments",
            view: <VoteAssignmentsPanel voteId={voteId} mode={mode}/>,
            testId: "vote-assignments-tab"
        }
    ]

    return (
        <EntityCard {...props}>
            <VoteCardHeader voteId={voteId}/>
            <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs}/>
        </EntityCard>
    )
}

export default VoteCard;