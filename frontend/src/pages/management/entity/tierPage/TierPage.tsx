import React, { useCallback, useEffect, useState } from 'react';
import classes from './TierPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteTier, getTier, updateTier } from '../../../../features/tier/api/Tier.api';
import { Tier } from '../../../../features/tier/model/Tier.types';
import { MANAGEMENT_TIERS_ROUTE } from '../../../../app/Routes';
import TierCard from '../../../../features/tier/components/tierCard/TierCard';
import { Mode } from '../../../../components/entityCard/EntityCard';
import { useExecute } from '../../../../hooks/UseExecute';
import LoadElement from '../../../../components/loadElement/LoadElement';

const TierPage = () => {
	const navigate = useNavigate()
	const { tierId } = useParams<{ tierId: string }>()
	const getTierCallback = useCallback(() => tierId ? getTier(tierId) : Promise.resolve(null), [tierId])
	const { result: tier, executing, error } = useExecute(getTierCallback)
	const [editedTier, setEditedTier] = useState<Tier | null>(null)

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
			navigate(MANAGEMENT_TIERS_ROUTE)
		}
	}

	return (
		<div className={classes.root}>
			<LoadElement loading={executing}>
				{!executing && error ? error.toString() : null}
				{!executing && !error && !tier ? "Entity not found!" : null}
				{!executing && !error && editedTier ?
					<TierCard
						tier={editedTier}
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