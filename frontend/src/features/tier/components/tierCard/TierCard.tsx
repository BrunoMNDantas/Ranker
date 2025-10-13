import { HTMLAttributes, useState } from 'react';
import EntityCard from '../../../../components/entityCard/EntityCard';
import TierCardHeader from './tierCardHeader/TierCardHeader';
import { Mode } from '../../../../components/entityCard/EntityCard';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import TierIcon from '../tierIcon/TierIcon';
import AssignmentIcon from '../../../assignment/components/assignmentIcon/AssignmentIcon';
import TierAssignmentsPanel from './tierAssignmentsPanel/TierAssignmentsPanel';
import TierFormPanel from './tierFormPanel/TierFormPanel';

export interface TierCardProps extends HTMLAttributes<HTMLDivElement> {
    tierId: string
    mode: Mode
}

const TierCard = ({ tierId, mode, ...props }: TierCardProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const tabs = [
        {
            icon: <TierIcon/>,
            label: "Tier",
            view: <TierFormPanel tierId={tierId} mode={mode}/>
        },
        {
            icon: <AssignmentIcon/>,
            label: "Assignments",
            view: <TierAssignmentsPanel tierId={tierId} mode={mode}/>
        }
    ]

    return (
        <EntityCard {...props}>
            <TierCardHeader tierId={tierId}/>
            <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs}/>
        </EntityCard>
    )
}

export default TierCard;