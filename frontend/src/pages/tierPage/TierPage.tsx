import React, { useEffect, useState } from 'react';
import classes from './TierPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteTier, updateTier } from '../../features/tier/api/Tier.api';
import { Tier } from '../../features/tier/model/Tier.types';
import { APP_TIERS_ROUTE } from '../../app/Routes';
import LoadElement from '../../components/loadElement/LoadElement';
import TierCard from '../../features/tier/components/tierCard/TierCard';
import { Mode } from '../../components/entityCard/EntityCard';
import { useTier } from '../../features/tier/hooks/UseTier.hook';
import { useAssignmentsOfTier } from '../../features/assignment/hooks/UseAssignmentsOfTier.hook';

const TierPage = () => {
	const navigate = useNavigate()
	const { tierId } = useParams<{ tierId: string }>()
	const [editedTier, setEditedTier] = useState<Tier | null>(null)

	const { tier, fetching: fetchingTier, error: tierError } = useTier(tierId || "")
	const { assignments, fetching: fetchingAssignments, error: assignmentsError } = useAssignmentsOfTier(tierId || "")

	const fetching = fetchingTier || fetchingAssignments
	const error = tierError || assignmentsError

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

	const handleSave = () => {
		if (editedTier) {
			return updateTier(editedTier)
		}
		return Promise.resolve()
	}

	const handleDelete = async () => {
		if (tier?.id) {
			await deleteTier(tier.id)
			navigate(APP_TIERS_ROUTE)
		}
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !tier ? "Entity not found!" : null}
				{!fetching && !error && editedTier ?
					<TierCard
						tier={editedTier}
						assignments={assignments || []}
						mode={Mode.EDIT}
						onTierChange={handleTierChange}
						onClear={handleClear}
						onSave={handleSave}
						onDelete={handleDelete}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default TierPage;