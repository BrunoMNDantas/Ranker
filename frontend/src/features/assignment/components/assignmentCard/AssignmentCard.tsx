import React, { HTMLAttributes, useState } from 'react';
import { Assignment } from '../../model/Assignment.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import { deleteAssignment, updateAssignment } from '../../api/Assignment.api';
import AssignmentCardHeader from './assignmentCardHeader/AssignmentCardHeader';
import AssignmentCardActions from './assignmentCardActions/AssignmentCardActions';
import AssignmentCardContent from './assignmentCardContent/AssignmentCardContent';

export interface AssignmentCardProps extends HTMLAttributes<HTMLDivElement> {
    assignment: Assignment
}

const AssignmentCard = ({ assignment, ...props }: AssignmentCardProps) => {
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
            cardContent={<AssignmentCardContent assignment={editedAssignment} onAssignmentChange={handleChange}/>}
            cardActions={<AssignmentCardActions assignment={editedAssignment} onClear={handleClear} onSave={handleSave} onDelete={handleDelete}/>}
            {...props}/>
    );
}

export default AssignmentCard;