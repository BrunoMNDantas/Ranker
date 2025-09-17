import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROOT_ROUTE } from '../../app/Routes';

export const DEFAULT_SX = {
	textDecoration: "none",
	color: "inherit",
	fontWeight: "inherit",
	cursor: "pointer"
}

const AppTitle = ({ variant="h1", component=Link, sx=DEFAULT_SX, ...props }: TypographyProps) => {
	return (
		<Typography variant={variant} component={component} to={ROOT_ROUTE} sx={sx} {...props}>
      		Ranker
    	</Typography>
	);
}

export default AppTitle;