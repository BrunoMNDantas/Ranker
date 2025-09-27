import React, { HTMLAttributes, useState, ReactNode } from 'react';
import classes from './EntitySortableList.module.css';
import {
    DndContext, DragEndEvent, DragStartEvent, DragOverlay,
    closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { Entity } from '../../services/store/Store';
import EntityList, { EntityListItemProps } from '../entityList/EntityList';
import { CSSProperties } from '@mui/material';
import { CSS } from '@dnd-kit/utilities';

export interface EntityListIemProps<T extends Entity> extends HTMLAttributes<HTMLDivElement> {
    entity: T
    entityRenderer: (entity: T) => ReactNode
}

const EntityListItem = <T extends Entity,>({ entity, entityRenderer, ...props }: EntityListItemProps<T>) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({id: entity.id})

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
        visibility: isDragging ? 'hidden' : 'visible'
    }

    return (
        <div ref={setNodeRef} className={classes.item} style={style} {...listeners} {...attributes} {...props}>
            { entityRenderer(entity) }
        </div>
    )
}

export interface EntitySortableListProps<T extends Entity> extends HTMLAttributes<HTMLDivElement> {
    entities: T[]
    onEntitiesChange:(entities: T[]) => void
    entityRenderer: (entity: T) => ReactNode
}

const EntitySortableList = <T extends Entity, >({ entities, onEntitiesChange, entityRenderer, ...props }: EntitySortableListProps<T>) => {
    const [activeId, setActiveId] = useState<string | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 1,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

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

        const draggedEntity = entities.find(entity => entity.id === draggedId)
        const droppedEntity = entities.find(entity => entity.id === droppedId)

        const droppedIndex = entities.indexOf(droppedEntity!)

        const newEntities = entities.filter(entity => entity !== draggedEntity)

        newEntities.splice(droppedIndex, 0, draggedEntity!)

        onEntitiesChange(newEntities)
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <EntityList
                entities={entities}
                entityRenderer={entity => <EntityListItem entity={entity} entityRenderer={entityRenderer}/>}
                {...props}/>
            <DragOverlay dropAnimation={null} style={{transformOrigin: '0 0'}}>
                {
                    activeId ?
                        <div className={classes.dragOverlay}>
                            <EntityListItem entity={entities.find(entity => entity.id === activeId)!} entityRenderer={entityRenderer}/>
                        </div> :
                        null
                }
            </DragOverlay>
        </DndContext>
    )
}

export default EntitySortableList;