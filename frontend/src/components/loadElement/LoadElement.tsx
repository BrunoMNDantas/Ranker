import CircularProgress from '@mui/material/CircularProgress';
import React, { HTMLAttributes } from 'react';

export interface LoadElementProps extends HTMLAttributes<HTMLDivElement> {
	loading: boolean
}

export const LoadElement = ({ loading, children, ...props }: LoadElementProps) => {
	return (
		<div {...props}>
			{ loading ? <CircularProgress/> : null }
			{ children }
		</div>
	);
};

export default LoadElement;