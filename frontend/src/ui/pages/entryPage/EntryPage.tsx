import React from 'react';
import classes from './EntryPage.module.css';
import AppTitle from '../../components/appTitle/AppTitle';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { APP_ROUTE, MANAGEMENT_ROUTE } from '../../../Routes';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const EntryPage = () => {
	return (
		<div className={classes.root}>
			<AppTitle/>
			<div className={classes.buttons}>
				<Button component={Link} size="large" to={APP_ROUTE} variant="contained" startIcon={<FormatListBulletedIcon/>}>
					Go to App
				</Button>
				<Button component={Link} size="large" to={MANAGEMENT_ROUTE} variant="contained" startIcon={<ManageAccountsIcon/>}>
					Go to Management
				</Button>
			</div>
		</div>
	);
}

export default EntryPage;