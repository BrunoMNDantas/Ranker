import React, { HTMLAttributes } from 'react';
import classes from './EntityForm.module.css';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';
import { Entity } from '../../../../../logic/api/Store';

export interface EntityFormProps<T extends Entity> extends HTMLAttributes<HTMLDivElement> {
	entity: T
	onClear: () => void
	onSave: () => void
	onDelete: () => void
}

export const EntityForm = <T extends Entity,>({ entity, onClear, onSave, onDelete, children, ...props }: EntityFormProps<T>) => {
	const className = props.className ? props.className : classes.root

	return (
		<div className={className} {...props}>
			{ children }
			<div className={classes.buttons}>
				<Button
					variant="outlined"
					endIcon={<RefreshIcon/>}
					onClick={onClear}>
					Clear
				</Button>
				<Button
					variant="contained"
					endIcon={<SaveIcon/>}
					onClick={onSave}>
					Save
				</Button>
				<Button
					variant="contained"
					startIcon={<DeleteIcon/>}
					onClick={onDelete}
					color={"error"}>
					Delete
				</Button>
			</div>
		</div>
	);
};

export default EntityForm;