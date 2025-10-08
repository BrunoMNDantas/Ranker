import React from 'react';
import classes from './AppLayout.module.css';
import AppTitle from '../../components/appTitle/AppTitle';
import { Outlet, useNavigate } from 'react-router-dom';
import ProfileButton from '../../features/auth/components/profileButton/ProfileButton';
import { useAuth } from '../../features/auth/components/AuthContext';
import { appUserRoute } from '../../app/Routes';
import { logout } from '../../features/auth/api/Auth.api';
import { useAppSelector } from '../../app/hooks';
import { selectUserById } from '../../features/user/store/User.selectors';

const AppLayout = () => {
	const navitage = useNavigate()
	const auth = useAuth()
	const user = useAppSelector((state) => auth.userId ? selectUserById(state, auth.userId) : undefined)

	const handleProfile = () => user ? navitage(appUserRoute(user.id)) : null

	const handleLogout = () => logout()

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<AppTitle/>
				<div className={classes.profileButton}>
					<ProfileButton onProfile={handleProfile} onLogout={handleLogout}/>
				</div>
			</div>
			<div className={classes.content}>
				<Outlet/>
			</div>
		</div>
	);
}

export default AppLayout;