import React from 'react';
import classes from './AppLayout.module.css';
import AppTitle from '../../components/appTitle/AppTitle';
import { Outlet } from 'react-router-dom';

const AppPage = () => {
	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<AppTitle/>
			</div>
			<div className={classes.content}>
				<Outlet/>
			</div>
		</div>
	);
}

export default AppPage;