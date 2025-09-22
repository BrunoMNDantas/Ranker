import React, { HTMLAttributes, useState } from 'react';
import { Vote } from '../../../model/Vote.types';
import EntityCardContent from '../../../../../components/entityCard/entityCardContent/EntityCardContent';
import { Mode } from '../../../../../components/entityCard/EntityCard';
import VoteCardForm from '../voteCardForm/VoteCardForm';
import VoteIcon from '../../voteIcon/VoteIcon';
import { Assignment } from '../../../../assignment/model/Assignment.types';
import AssignmentIcon from '../../../../assignment/components/assignmentIcon/AssignmentIcon';
import AssignmentsList from '../../../../assignment/components/assignmentsList/AssignmentsList';
import { appAssignmentRoute } from '../../../../../app/Routes';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export interface VoteCardContentProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
    assignments: Assignment[]
    mode: Mode
    onVoteChange: (vote: Vote) => void
    onDeleteAssignment: (assignment: Assignment) => Promise<void>
}

const VoteCardContent = ({ vote, assignments, mode, onVoteChange, onDeleteAssignment, ...props }: VoteCardContentProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(1)
    const editMode = mode === Mode.EDIT

    const tabs = [
        {
            icon: <VoteIcon/>,
            label: "Vote",
            view: <VoteCardForm vote={vote} onVoteChange={onVoteChange} mode={mode}/>
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

export default VoteCardContent;