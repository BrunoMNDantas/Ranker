import React, { useEffect, useState } from 'react';
import classes from './UserPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { APP_TIERS_ROUTE } from '../../app/Routes';
import LoadElement from '../../components/loadElement/LoadElement';
import { Mode } from '../../components/entityCard/EntityCard';
import { User } from '../../features/user/model/User.types';
import { useUser } from '../../features/user/hooks/UseUser.hook';
import { deleteUser, updateUser } from '../../features/user/api/User.api';
import UserCard from '../../features/user/components/userCard/UserCard';
import { useAuth } from '../../features/auth/components/AuthContext';

const UserPage = () => {
	const navigate = useNavigate()
	const auth = useAuth()
	const { userId } = useParams<{ userId: string }>()
	const [editedUser, setEditedUser] = useState<User | null>(null)

	const { user, fetching: fetchingUser, error: userError } = useUser(userId || "")

	const fetching = fetchingUser
	const error = userError

	useEffect(() => {
		if(!editedUser) {
			setEditedUser(structuredClone(user))
		}
	}, [editedUser, user])


	const handleUserChange = (changedUser: User) => {
		setEditedUser(changedUser)
	}

	const handleClear = () => {
		setEditedUser(structuredClone(user))
		return Promise.resolve()
	}

	const handleSave = () => {
		if (editedUser) {
			return updateUser(editedUser)
		}
		return Promise.resolve()
	}

	const handleDelete = async () => {
		if (user?.id) {
			await deleteUser(user.id)
			navigate(APP_TIERS_ROUTE)
		}
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !user ? "Entity not found!" : null}
				{!fetching && !error && editedUser ?
					<UserCard
						user={editedUser}
						mode={auth.userId === editedUser.id ? Mode.EDIT : Mode.VIEW}
						onUserChange={handleUserChange}
						onClear={handleClear}
						onSave={handleSave}
						onDelete={handleDelete}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default UserPage;