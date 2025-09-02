import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROOT_ROUTE } from '../../../Routes';

const AppTitle = ({ ...props }) => {
	const style = {
		textDecoration: "none",
		color: "inherit",
		fontWeight: "inherit",
		cursor: "pointer"
	}

	return (
		<Typography variant="h1" component={Link} to={ROOT_ROUTE} sx={style} {...props}>
      		Ranker
    	</Typography>
	);
}

export default AppTitle;