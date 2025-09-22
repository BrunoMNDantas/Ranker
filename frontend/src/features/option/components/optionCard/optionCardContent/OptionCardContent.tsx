import React, { HTMLAttributes, useState } from 'react';
import { Option } from '../../../model/Option.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import OptionCardForm from '../optionCardForm/OptionCardForm';
import OptionIcon from '../../optionIcon/OptionIcon';
import AssignmentIcon from '../../../../assignment/components/assignmentIcon/AssignmentIcon';
import AssignmentsList from '../../../../assignment/components/assignmentsList/AssignmentsList';
import { Assignment } from '../../../../assignment/model/Assignment.types';
import { appAssignmentRoute } from '../../../../../app/Routes';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export interface OptionCardContentProps extends HTMLAttributes<HTMLDivElement> {
    option: Option
    assignments: Assignment[]
    mode: Mode
    onOptionChange: (option: Option) => void
    onDeleteAssignment: (assignment: Assignment) => Promise<void>
}

const OptionCardContent = ({ option, assignments, mode, onOptionChange, onDeleteAssignment, ...props }: OptionCardContentProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(1)
    const editMode = mode === Mode.EDIT

    const tabs = [
        {
            icon: <OptionIcon/>,
            label: "Option",
            view: <OptionCardForm option={option} onOptionChange={onOptionChange} mode={mode}/>
        },
        {
            icon: <AssignmentIcon/>,
            label: "Assignments",
            view: (
                <AssignmentsList
                    assignments={assignments}
                    assignmentUrl={assignment => appAssignmentRoute(assignment.id!)}
                    chipActions={assignment => [
                        editMode ?
                            <IconButton
                                color="error"
                                onClick={e => {
                                    e.preventDefault()
                                    onDeleteAssignment(assignment)
                                }}
                                size='small'>
                                <ClearIcon/>
                            </IconButton> :
                        null
                    ]}/>
            )
        }
    ]

    return <EntityCardContent activeTabIndex={activeTabIndex} activeTabIndexChanged={setActiveTabIndex} tabs={tabs} {...props}/>
}

export default OptionCardContent;