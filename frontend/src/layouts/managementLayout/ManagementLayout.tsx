import React from 'react';
import classes from './ManagementLayout.module.css';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import {
	MANAGEMENT_ASSIGNMENTS_ROUTE, MANAGEMENT_OPTIONS_ROUTE,
	MANAGEMENT_RANKS_ROUTE, MANAGEMENT_TIERS_ROUTE,
	MANAGEMENT_VOTES_ROUTE
} from '../../app/Routes';
import AppTitle from '../../components/appTitle/AppTitle';

const ManagementLayout = () => {
	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<AppTitle/>
			</div>
			<div className={classes.content}>
				<Outlet/>
			</div>
			<div className={classes.footer}>
				<BottomNavigation showLabels>
                	<BottomNavigationAction label="Ranks" component={Link} to={MANAGEMENT_RANKS_ROUTE}/>
                	<BottomNavigationAction label="Tiers" component={Link} to={MANAGEMENT_TIERS_ROUTE}/>
                	<BottomNavigationAction label="Options" component={Link} to={MANAGEMENT_OPTIONS_ROUTE}/>
                	<BottomNavigationAction label="Votes" component={Link} to={MANAGEMENT_VOTES_ROUTE}/>
                	<BottomNavigationAction label="Assignments" component={Link} to={MANAGEMENT_ASSIGNMENTS_ROUTE}/>
            	</BottomNavigation>
			</div>
		</div>
	);
}

export default ManagementLayout;