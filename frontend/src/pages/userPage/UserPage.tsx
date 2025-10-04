import React, { useEffect, useState } from 'react';
import classes from './UserPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { APP_TIERS_ROUTE } from '../../app/Routes';
import LoadElement from '../../components/loadElement/LoadElement';
import { Mode } from '../../components/entityCard/EntityCard';
import { User } from '../../features/user/model/User.types';
import { useUserPageData } from '../../features/user/hooks/UseUserPage.hook';
import { deleteUser, updateUser } from '../../features/user/api/User.api';
import UserCard from '../../features/user/components/userCard/UserCard';
import { useAuth } from '../../features/auth/components/AuthContext';
import RankFormModal from '../../features/rank/components/rankFormModal/RankFormModal';
import { createRank } from '../../services/EntityFactory.service';
import { Rank } from '../../features/rank/model/Rank.types';
import { deleteRank, createRank as submitRank } from '../../features/rank/api/Rank.api';
import { Vote } from '../../features/vote/model/Vote.types';
import { deleteVote } from '../../features/vote/api/Vote.api';
import { fetchRanksOfUser } from '../../features/rank/store/Rank.thunks';
import { fetchVotesOfUser } from '../../features/vote/store/Vote.thunks';
import { useAppDispatch } from '../../app/hooks';

const UserPage = () => {
	const navigate = useNavigate()
	const auth = useAuth()
	const dispatch = useAppDispatch()
	const { userId } = useParams<{ userId: string }>()
	const [editedUser, setEditedUser] = useState<User | null>(null)
	const [showRankModal, setShowRankModal] = useState(false)

	const { user, ranks, votes, fetching, error } = useUserPageData(userId || "")

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

	const handleCreateRankClick = () => {
		setShowRankModal(true)
		return Promise.resolve()
	}

	const handleCreateRank = async (rank: Rank) => {
		await submitRank(rank)
		setShowRankModal(false)
		dispatch(fetchRanksOfUser(userId || ""))
	}

	const handleCreateRankCancel = () => {
		setShowRankModal(false)
		return Promise.resolve()
	}

	const handleDeleteRank = async (rank: Rank) => {
		await deleteRank(rank.id)
		dispatch(fetchRanksOfUser(userId || ""))
		dispatch(fetchVotesOfUser(userId || ""))
	}

	const handleDeleteVote = async (vote: Vote) => {
		await deleteVote(vote.id)
		dispatch(fetchVotesOfUser(userId || ""))
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
						ranks={ranks}
						votes={votes}
						mode={auth.userId === editedUser.id ? Mode.EDIT : Mode.VIEW}
						onUserChange={handleUserChange}
						onClear={handleClear}
						onSave={handleSave}
						onDelete={handleDelete}
						onCreateRank={handleCreateRankClick}
						onDeleteRank={handleDeleteRank}
						onDeleteVote={handleDeleteVote}/> :
					null
				}
			</LoadElement>
			<RankFormModal
				open={showRankModal}
				defaultRank={createRank({})}
				onCancel={handleCreateRankCancel}
				onCreate={handleCreateRank}/>
		</div>
	);
}

export default UserPage;