import React from 'react';
import classes from './ManagementLayout.module.css';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import {
	MANAGEMENT_ASSIGNMENTS_ROUTE, MANAGEMENT_OPTIONS_ROUTE,
	MANAGEMENT_RANKS_ROUTE, MANAGEMENT_TIERS_ROUTE,
	MANAGEMENT_VOTES_ROUTE
} from '../../../Routes';
import AppTitle from '../../components/appTitle/AppTitle';

const ManagementLayout = () => {
	const navigate = useNavigate()

	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<AppTitle className={classes}/>
			</div>
			<div className={classes.content}>
				<Outlet/>
			</div>
			<div className={classes.footer}>
				<BottomNavigation showLabels>
                	<BottomNavigationAction label="Ranks" onClick={() => navigate(MANAGEMENT_RANKS_ROUTE)}/>
                	<BottomNavigationAction label="Tiers" onClick={() => navigate(MANAGEMENT_TIERS_ROUTE)}/>
                	<BottomNavigationAction label="Options" onClick={() => navigate(MANAGEMENT_OPTIONS_ROUTE)}/>
                	<BottomNavigationAction label="Votes" onClick={() => navigate(MANAGEMENT_VOTES_ROUTE)}/>
                	<BottomNavigationAction label="Assignments" onClick={() => navigate(MANAGEMENT_ASSIGNMENTS_ROUTE)}/>
            	</BottomNavigation>
			</div>
		</div>
	);
}

export default ManagementLayout;