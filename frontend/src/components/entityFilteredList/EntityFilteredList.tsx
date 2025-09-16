import React, { useEffect, useState } from 'react';
import classes from './EntityFilteredList.module.css';
import { Entity } from '../../services/Store';
import EntityList, { EntityListProps } from '../entityList/EntityList';
import { TextField } from '@mui/material';

export interface EntityFilteredListProps<T extends Entity> extends EntityListProps<T> {
    filter: (text: string) => T[]
}

const EntityFilteredList =  <T extends Entity,>({ filter, ...props }: EntityFilteredListProps<T>) => {
    const [filterText, setFilterText] = useState("")
    const [filteredEntities, setFilteredEntities] = useState<T[]>([])
    const className = props.className || classes.root

    useEffect(() => {
        setFilteredEntities(filter(filterText))
    }, [props.entities, filterText, setFilteredEntities])

    return (
        <div className={className} {...props}>
            <div className={classes.filter}>
                <TextField label="Filter" type="text" value={filterText} onChange={e => setFilterText(e.target.value)}/>
            </div>
            <div className={classes.list}>
                <EntityList {...props} entities={filteredEntities}/>
            </div>
        </div>
    );
}

export default EntityFilteredList;