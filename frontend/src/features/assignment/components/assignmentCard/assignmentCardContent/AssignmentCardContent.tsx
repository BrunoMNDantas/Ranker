import React, { HTMLAttributes, useState } from 'react';
import { Assignment } from '../../../model/Assignment.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import AssignmentCardForm from '../assignmentCardForm/AssignmentCardForm';
import AssignmentIcon from '../../assignmentIcon/AssignmentIcon';

export interface AssignmentCardContentProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
    mode: Mode
    onAssignmentChange: (assignment: Assignment) => void
}

const AssignmentCardContent = ({ assignment, onAssignmentChange, mode, ...props }: AssignmentCardContentProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(1)
    const tabs = [
        {
            icon: <AssignmentIcon/>,
            label: "Assignment",
            view: <AssignmentCardForm assignment={assignment} onAssignmentChange={onAssignmentChange} mode={mode}/>}
    ]

    return <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs} {...props}/>
}

export default AssignmentCardContent;