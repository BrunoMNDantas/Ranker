import React, { HTMLAttributes, useState } from 'react';
import classes from './VotingBoard.module.css'
import { Tier } from '../../../../tier/model/Tier.types';
import { Option } from '../../../../option/model/Option.types';
import { Assignment } from '../../../../assignment/model/Assignment.types';
import OptionAvatar from '../../../../option/components/optionAvatar/OptionAvatar';
import { Divider } from '@mui/material';
import {
    DndContext, DragEndEvent, DragStartEvent, DragOverlay,
    closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { createAssignment } from '../../../../../services/EntityFactory.service';
import UnassignedOptionsArea from '../unassignedArea/UnassignedArea';
import TierArea from '../tierArea/TierArea';

export interface VotingBoardProps extends HTMLAttributes<HTMLDivElement> {
    tiers: Tier[]
    options: Option[]
    assignments: Assignment[]
    onAssignmentsChange: (assignments: Assignment[]) => void
}

const VotingBoard = ({ tiers, options, assignments, onAssignmentsChange, ...props }: VotingBoardProps) => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const unassignedOptions = options.filter(option => assignments.every(assignment => assignment.optionId !== option.id))

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const getOptionsForTier = (tier: Tier): Option[] => {
        const tierAssignments = assignments.filter(assignment => assignment.tierId === tier.id)

        const optionsOfTier = tierAssignments
            .map(assignment => assignment.optionId)
            .map(optionId => options.find(option => option.id === optionId))
            .filter((option): option is Option => option !== undefined)

        return optionsOfTier
            .sort((optionA, optionB) => {
                const assignmentA = assignments.find(assignment => assignment.optionId === optionA.id)
                const assignmentB = assignments.find(assignment => assignment.optionId === optionB.id)
                return (assignmentA?.order || 0) - (assignmentB?.order || 0)
            })
    };

    const handleDragStart = ({ active }: DragStartEvent) => {
        setActiveId(active.id as string)
    }

    const handleDragEnd = ({active, over}: DragEndEvent) => {
        setActiveId(null)

        if(!over) {
            return
        }

        const draggedId = active.id as string
        const droppedId = over.id as string

        const draggedOption = options.find(option => option.id === draggedId)
        const droppedOption = options.find(option => option.id === droppedId)
        const droppedTier = tiers.find(tier => tier.id === droppedId)

        if (droppedOption) {
            moveToOption(draggedOption!, droppedOption)
        } else if(droppedTier) {
            moveToTier(draggedOption!, droppedTier)
        } else {
            moveToUnassigned(draggedOption!)
        }
    }

    const moveToOption = (draggedOption: Option, droppedOption: Option) => {
        const droppedAssignment = assignments.find(assignment => assignment.optionId === droppedOption.id)

        if(!droppedAssignment) {
            moveToUnassigned(draggedOption)
        } else {
            const newAssignments = assignments.filter(assignment => assignment.optionId !== draggedOption.id)

            const droppedOrder = droppedAssignment.order
            const insertIndex = newAssignments.findIndex(assignment =>
                assignment.tierId === droppedAssignment.tierId && assignment.order >= droppedOrder
            )

            const newAssignment = createAssignment({
                order: 0,
                optionId: draggedOption.id,
                tierId: droppedAssignment.tierId
            })

            if (insertIndex === -1) {
                newAssignments.push(newAssignment)
            } else {
                newAssignments.splice(insertIndex, 0, newAssignment)
            }

            updateAssignmentsOrder(newAssignments)

            onAssignmentsChange(newAssignments)
        }
    }

    const moveToTier = (option: Option, tier: Tier) => {
        const newAssignments = assignments.filter(assignment => assignment.optionId !== option.id)
        const tierOptions = getOptionsForTier(tier)
        newAssignments.push(createAssignment({
            order: tierOptions.length,
            optionId: option.id,
            tierId: tier.id
        }))

        updateAssignmentsOrder(newAssignments)

        onAssignmentsChange(newAssignments)
    }

    const moveToUnassigned = (option: Option) => {
        const newAssignments = assignments.filter(assignment => assignment.optionId !== option?.id)

        updateAssignmentsOrder(newAssignments)

        onAssignmentsChange(newAssignments)
    }

    const updateAssignmentsOrder = (assignments: Assignment[]) => {
        tiers.forEach(tier => {
            const tierAssignments = assignments.filter(assignment => assignment.tierId === tier.id)
            tierAssignments.forEach((assignment, index) => {
                assignment.order = index
            })
        })
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className={classes.root} {...props}>
                <div className={classes.tiers}>
                    { tiers.map(tier => <TierArea key={tier.id} tier={tier} options={getOptionsForTier(tier)}/>) }
                </div>
                <Divider/>
                <UnassignedOptionsArea options={unassignedOptions}/>
            </div>
            <DragOverlay dropAnimation={null} style={{transformOrigin: '0 0'}}>
                {
                    activeId ?
                        <div className={classes.dragOverlay}>
                            <OptionAvatar option={options.find(option => option.id === activeId)!}/>
                        </div> :
                        null
                }
            </DragOverlay>
        </DndContext>
    )
}

export default VotingBoard;