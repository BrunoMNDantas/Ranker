import React, { ReactNode } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export interface LoadElementProps {
  	loading: boolean;
  	children?: ReactNode;
}

export const LoadElement = ({ loading, children }: LoadElementProps) => {
  	return loading ? <CircularProgress/> : <>{children}</>;
};

export default LoadElement;