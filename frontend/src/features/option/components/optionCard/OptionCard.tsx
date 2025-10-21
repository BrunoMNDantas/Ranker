import { HTMLAttributes, useState } from 'react';
import EntityCard from '../../../../components/entityCard/EntityCard';
import OptionCardHeader from './optionCardHeader/OptionCardHeader';
import { Mode } from '../../../../components/entityCard/EntityCard';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import OptionIcon from '../optionIcon/OptionIcon';
import AssignmentIcon from '../../../assignment/components/assignmentIcon/AssignmentIcon';
import OptionAssignmentsPanel from './optionAssignmentsPanel/OptionAssignmentsPanel';
import OptionFormPanel from './optionFormPanel/OptionFormPanel';

export interface OptionCardProps extends HTMLAttributes<HTMLDivElement> {
    optionId: string
    mode: Mode
}

const OptionCard = ({ optionId, mode, ...props }: OptionCardProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const tabs = [
        {
            icon: <OptionIcon/>,
            label: "Option",
            view: <OptionFormPanel optionId={optionId} mode={mode}/>,
            testId: "option-tab"
        },
        {
            icon: <AssignmentIcon/>,
            label: "Assignments",
            view: <OptionAssignmentsPanel optionId={optionId} mode={mode}/>,
            testId: "option-assignments-tab"
        }
    ]

    return (
        <EntityCard {...props}>
            <OptionCardHeader optionId={optionId}/>
            <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs}/>
        </EntityCard>
    )
}

export default OptionCard;