import React, { HTMLAttributes, useState } from 'react';
import { Option } from '../../model/Option.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import OptionCardHeader from './optionCardHeader/OptionCardHeader';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { Assignment } from '../../../assignment/model/Assignment.types';
import EntityCardContent from '../../../../components/entityCard/entityCardContent/EntityCardContent';
import OptionIcon from '../optionIcon/OptionIcon';
import AssignmentIcon from '../../../assignment/components/assignmentIcon/AssignmentIcon';
import OptionAssignmentsPanel from './optionAssignmentsPanel/OptionAssignmentsPanel';
import OptionFormPanel from './optionFormPanel/OptionFormPanel';

export interface OptionCardProps extends HTMLAttributes<HTMLDivElement> {
    option: Option
    assignments: Assignment[]
    mode: Mode
    onOptionChange: (changedOption: Option) => void
    onClear: () => Promise<void>
    onSave: () => Promise<void>
    onDelete: () => Promise<void>
    onDeleteAssignment: (assignment: Assignment) => Promise<void>
}

const OptionCard = ({ option, assignments, mode, onOptionChange, onClear, onSave, onDelete, onDeleteAssignment, ...props }: OptionCardProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const tabs = [
        {
            icon: <OptionIcon/>,
            label: "Option",
            view: <OptionFormPanel option={option} onOptionChange={onOptionChange} mode={mode} onClear={onClear} onSave={onSave} onDelete={onDelete}/>
        },
        {
            icon: <AssignmentIcon/>,
            label: "Assignments",
            view: <OptionAssignmentsPanel assignments={assignments} mode={mode} onDeleteAssignment={onDeleteAssignment}/>
        }
    ]

    return (
        <EntityCard {...props}>
            <OptionCardHeader option={option}/>
            <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs}/>
        </EntityCard>
    )
}

export default OptionCard;