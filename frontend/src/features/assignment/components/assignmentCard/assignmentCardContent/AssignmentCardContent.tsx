import React, { HTMLAttributes } from 'react';
import { Assignment } from '../../../model/Assignment.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import AssignmentCardForm from '../assignmentCardForm/AssignmentCardForm';
import AssignmentIcon from '../../assignmentIcon/AssignmentIcon';

export interface AssignmentCardContentProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
    onAssignmentChange: (assignment: Assignment) => void
    mode: Mode
}

const AssignmentCardContent = ({ assignment, onAssignmentChange, mode, ...props }: AssignmentCardContentProps) => {
    const tabs = [
        {
            icon: <AssignmentIcon/>,
            label: "Assignment",
            view: <AssignmentCardForm assignment={assignment} onAssignmentChange={onAssignmentChange} mode={mode}/>}
    ]

    return <EntityCardContent tabs={tabs} {...props}/>
}

export default AssignmentCardContent;