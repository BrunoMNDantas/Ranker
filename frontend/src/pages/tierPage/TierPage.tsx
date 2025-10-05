import React, { useEffect, useState } from 'react';
import classes from './TierPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Tier } from '../../features/tier/model/Tier.types';
import { APP_TIERS_ROUTE } from '../../app/Routes';
import LoadElement from '../../components/loadElement/LoadElement';
import TierCard from '../../features/tier/components/tierCard/TierCard';
import { Mode } from '../../components/entityCard/EntityCard';
import { useTierPageData } from '../../features/tier/hooks/UseTierPage.hook';
import { Assignment } from '../../features/assignment/model/Assignment.types';
import { useAuth } from '../../features/auth/components/AuthContext';
import { deleteAssignmentThunk } from '../../features/assignment/store/Assignment.thunks';
import { updateTierThunk, deleteTierThunk } from '../../features/tier/store/Tier.thunks';
import { useAppDispatch } from '../../app/hooks';

const TierPage = () => {
	const navigate = useNavigate()
	const auth = useAuth()
	const dispatch = useAppDispatch()
	const { tierId } = useParams<{ tierId: string }>()
	const [editedTier, setEditedTier] = useState<Tier | null>(null)

	const { tier, assignments, fetching, error } = useTierPageData(tierId || "")

	useEffect(() => {
		if(!editedTier) {
			setEditedTier(structuredClone(tier))
		}
	}, [editedTier, tier])


	const handleTierChange = (changedTier: Tier) => {
		setEditedTier(changedTier)
	}

	const handleClear = () => {
		setEditedTier(structuredClone(tier))
		return Promise.resolve()
	}

	const handleSave = async () => {
		if (editedTier) {
			await dispatch(updateTierThunk(editedTier)).unwrap()
		}
	}

	const handleDelete = async () => {
		if (tier) {
			await dispatch(deleteTierThunk(tier.id)).unwrap()
			navigate(APP_TIERS_ROUTE)
		}
	}

	const handleDeleteAssignment = async (assignment: Assignment) => {
		await dispatch(deleteAssignmentThunk(assignment.id)).unwrap()
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !tier ? "Entity not found!" : null}
				{!fetching && !error && editedTier ?
					<TierCard
						tier={editedTier}
						assignments={assignments}
						mode={auth.userId === editedTier.ownerId ? Mode.EDIT : Mode.VIEW}
						onTierChange={handleTierChange}
						onClear={handleClear}
						onSave={handleSave}
						onDelete={handleDelete}
						onDeleteAssignment={handleDeleteAssignment}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default TierPage;