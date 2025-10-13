import { HTMLAttributes, useEffect, useState } from 'react';
import classes from './EntityFilteredList.module.css';
import { TextField } from '@mui/material';

export interface EntityFilteredListProps extends HTMLAttributes<HTMLDivElement> {
    onFilter: (text: string) => void,
}

const EntityFilteredList =  ({ onFilter, children, ...props }: EntityFilteredListProps) => {
    const [filterText, setFilterText] = useState("")
    const className = props.className || classes.root

    useEffect(() => {  onFilter(filterText) }, [onFilter, filterText])

    return (
        <div className={className} {...props}>
            <div className={classes.filter}>
                <TextField label="Filter" type="text" value={filterText} onChange={e => setFilterText(e.target.value)}/>
            </div>
            <div className={classes.list}>
                {children}
            </div>
        </div>
    );
}

export default EntityFilteredList;