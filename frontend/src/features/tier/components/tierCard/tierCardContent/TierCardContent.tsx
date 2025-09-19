import React, { HTMLAttributes } from 'react';
import { Tier } from '../../../model/Tier.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import TierCardForm from '../tierCardForm/TierCardForm';
import TierIcon from '../../tierIcon/TierIcon';
import AssignmentIcon from '../../../../assignment/components/assignmentIcon/AssignmentIcon';
import AssignmentsList from '../../../../assignment/components/assignmentsList/AssignmentsList';
import { Assignment } from '../../../../assignment/model/Assignment.types';
import { appAssignmentRoute } from '../../../../../app/Routes';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export interface TierCardContentProps extends HTMLAttributes<HTMLDivElement> {
    tier: Tier
    assignments: Assignment[]
    mode: Mode
    onTierChange: (tier: Tier) => void
    onDeleteAssignment: (assignment: Assignment) => Promise<void>
}

const TierCardContent = ({ tier, assignments, mode, onTierChange, onDeleteAssignment, ...props }: TierCardContentProps) => {
    const editMode = mode === Mode.EDIT

    const tabs = [
        {
            icon: <TierIcon/>,
            label: "Tier",
            view: <TierCardForm tier={tier} onTierChange={onTierChange} mode={mode}/>
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

    return <EntityCardContent tabs={tabs} {...props}/>
}

export default TierCardContent;