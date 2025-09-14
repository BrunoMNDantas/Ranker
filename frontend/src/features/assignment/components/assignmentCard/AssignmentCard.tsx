import React, { HTMLAttributes, useState } from 'react';
import { Assignment } from '../../model/Assignment.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import { deleteAssignment, updateAssignment } from '../../api/Assignment.api';
import AssignmentCardHeader from './assignmentCardHeader/AssignmentCardHeader';
import AssignmentCardActions from './assignmentCardActions/AssignmentCardActions';
import AssignmentCardContent from './assignmentCardContent/AssignmentCardContent';
import { Mode } from '../../../../components/entityCard/EntityCard';

export interface AssignmentCardProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
    mode: Mode
}

const AssignmentCard = ({ assignment, mode, ...props }: AssignmentCardProps) => {
    const [editedAssignment, setEditedAssignment] = useState(structuredClone(assignment))

    const handleChange = (changedAssignment: Assignment) => {
        setEditedAssignment(changedAssignment)
    }

    const handleClear = () => {
        setEditedAssignment(structuredClone(assignment))
        return Promise.resolve()
    }

    const handleSave = () => {
        return updateAssignment(editedAssignment)
    }

    const handleDelete = () => {
        return deleteAssignment(assignment.id!)
    }

    return (
        <EntityCard
            cardHeader={<AssignmentCardHeader assignment={editedAssignment}/>}
            cardContent={<AssignmentCardContent assignment={editedAssignment} onAssignmentChange={handleChange} mode={mode}/>}
            cardActions={<AssignmentCardActions assignment={editedAssignment} onClear={handleClear} onSave={handleSave} onDelete={handleDelete} mode={mode}/>}
            {...props}/>
    );
}

export default AssignmentCard;