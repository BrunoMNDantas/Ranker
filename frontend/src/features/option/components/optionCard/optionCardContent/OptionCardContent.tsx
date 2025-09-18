import React, { HTMLAttributes } from 'react';
import { Option } from '../../../model/Option.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import OptionCardForm from '../optionCardForm/OptionCardForm';
import OptionIcon from '../../optionIcon/OptionIcon';
import AssignmentIcon from '../../../../assignment/components/assignmentIcon/AssignmentIcon';
import AssignmentsList from '../../../../assignment/components/assignmentsList/AssignmentsList';
import { Assignment } from '../../../../assignment/model/Assignment.types';
import { appAssignmentRoute } from '../../../../../app/Routes';

export interface OptionCardContentProps extends HTMLAttributes<HTMLDivElement> {
    option: Option
    assignments: Assignment[]
    onOptionChange: (option: Option) => void
    mode: Mode
}

const OptionCardContent = ({ option, assignments, onOptionChange, mode, ...props }: OptionCardContentProps) => {
    const tabs = [
        {
            icon: <OptionIcon/>,
            label: "Option",
            view: <OptionCardForm option={option} onOptionChange={onOptionChange} mode={mode}/>
        },
        {
            icon: <AssignmentIcon/>,
            label: "Assignments",
            view: <AssignmentsList assignments={assignments} assignmentUrl={assignment => appAssignmentRoute(assignment.id!)}/>
        }
    ]

    return <EntityCardContent tabs={tabs} {...props}/>
}

export default OptionCardContent;