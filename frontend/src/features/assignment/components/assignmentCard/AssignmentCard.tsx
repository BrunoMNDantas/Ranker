import { HTMLAttributes, useState } from 'react';
import EntityCard from '../../../../components/entityCard/EntityCard';
import AssignmentCardHeader from './assignmentCardHeader/AssignmentCardHeader';
import { Mode } from '../../../../components/entityCard/EntityCard';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import AssignmentIcon from '../assignmentIcon/AssignmentIcon';
import AssignmentFormPanel from './assignmentFormPanel/AssignmentFormPanel';

export interface AssignmentCardProps extends HTMLAttributes<HTMLDivElement> {
    assignmentId: string
    mode: Mode
}

const AssignmentCard = ({ assignmentId, mode, ...props }: AssignmentCardProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const tabs = [
        {
            icon: <AssignmentIcon/>,
            label: "Assignment",
            view: <AssignmentFormPanel assignmentId={assignmentId} mode={mode}/>
        }
    ]

    return (
        <EntityCard {...props}>
            <AssignmentCardHeader assignmentId={assignmentId}/>
            <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs}/>
        </EntityCard>
    )
}

export default AssignmentCard;