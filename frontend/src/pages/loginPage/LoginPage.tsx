import React from 'react';
import classes from './LoginPage.module.css';
import { login, register, loginWithGoogle } from '../../features/auth/api/Auth.api';
import { useNavigate } from 'react-router-dom';
import { APP_RANKS_ROUTE } from '../../app/Routes';
import LoginCard from '../../features/auth/components/loginCard/LoginCard';

const ERROR_MAP: Record<string,string> = {
      "auth/popup-closed-by-user": "Popup closed.",
      "auth/cancelled-popup-request": "Please try again.",
      "auth/popup-blocked": "Popup blocked by the browser.",
      "auth/account-exists-with-different-credential": "This email exists with a different sign-in method. Try email/password then link Google in profile.",
	  "auth/invalid-credential": "Invalid credentials.",
	  "auth/email-already-in-use": "Email already registered."
}

const getErrorMessage = (e: any) => {
	const code = e?.code
	return ERROR_MAP[code] || "Something went wrong."
}

const LoginPage = () => {
	const navigate = useNavigate()

	const handleRegisterUser = async (email: string, password: string) => {
		try {
			await register(email, password)
			navigate(APP_RANKS_ROUTE)
		} catch(e) {
			window.alert(getErrorMessage(e))
		}
	}

	const handleLoginWithEmail = async (email: string, password: string) => {
		try {
			await login(email, password)
			navigate(APP_RANKS_ROUTE)
		} catch(e) {
			window.alert(getErrorMessage(e))
		}
	}

	const handleLoginWithGoogle = async () => {
		try {
			await loginWithGoogle()
			navigate(APP_RANKS_ROUTE)
		} catch(e) {
			window.alert(getErrorMessage(e))
		}
	}

	return (
		<div className={classes.root}>
			<LoginCard
				onRegisterUser={handleRegisterUser}
				onLoginWithEmail={handleLoginWithEmail}
				onLoginWithGoogle={handleLoginWithGoogle}/>
		</div>
	)

}

export default LoginPage;