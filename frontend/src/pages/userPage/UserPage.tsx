import classes from './UserPage.module.css';
import { useParams } from 'react-router-dom';
import LoadElement from '../../components/loadElement/LoadElement';
import { Mode } from '../../components/entityCard/EntityCard';
import { useUserPageData } from '../../features/user/hooks/UseUserPage.hook';
import UserCard from '../../features/user/components/userCard/UserCard';
import { useAuth } from '../../features/auth/components/AuthContext';
import { useAppSelector } from '../../app/hooks';
import { selectUserById } from '../../features/user/store/User.selectors';

const UserPage = () => {
	const auth = useAuth()
	const { userId } = useParams<{ userId: string }>()
	const { fetching, error } = useUserPageData(userId || "")
	const user = useAppSelector(state => selectUserById(state, userId || ""))

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !user ? "Entity not found!" : null}
				{!fetching && !error && user ?
					<UserCard userId={user.id} mode={auth.userId === user.id ? Mode.EDIT : Mode.VIEW}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default UserPage;