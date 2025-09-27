import React, { HTMLAttributes, ReactNode } from 'react';
import classes from './EntityList.module.css';
import { Entity } from '../../services/store/Store';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

export interface EntityListItemProps<T extends Entity> extends HTMLAttributes<HTMLDivElement> {
    entity: T
    entityRenderer: (entity: T) => ReactNode
    entityUrl?: string
    onEntityClick?: (entity: T )=> void
}

export const EntityListItem =  <T extends Entity,>({ entity, entityRenderer, entityUrl, onEntityClick, ...props }: EntityListItemProps<T>) => {
    const className = props.className || [classes.item, entityUrl ? classes.itemLink : ""].join(" ")

    const handleClick = () => {
        if(onEntityClick) {
            onEntityClick(entity)
        }
    }

    return (
        <div className={className} onClick={handleClick} {...props}>
            {
                entityUrl ?
                    <Link
                        component={RouterLink}
                        to={entityUrl}
                        underline="none"
                        sx={{
                            display: "flex",
                            borderColor: "divider",
                            color: "unset"
                        }}>
                        { entityRenderer(entity) }
                    </Link> :
                    entityRenderer(entity)
            }
        </div>
    );
}

export interface EntityListProps<T extends Entity> extends HTMLAttributes<HTMLDivElement> {
    entities: T[]
    entityRenderer: (entity: T) => ReactNode
    entityUrl?: (entity: T) => string
    onEntityClick?: (entity: T ) => void
}

const EntityList =  <T extends Entity,>({ entities, entityRenderer, entityUrl, onEntityClick, ...props }: EntityListProps<T>) => {
    const className = props.className || classes.root

    return (
        <div className={className} {...props}>
            { entities.map(entity => (
                <EntityListItem
                    key={entity.id}
                    entity={entity}
                    entityRenderer={entityRenderer}
                    entityUrl={entityUrl ? entityUrl(entity) : undefined}
                    onEntityClick={onEntityClick}/>
            ))}
        </div>
    );
}

export default EntityList;