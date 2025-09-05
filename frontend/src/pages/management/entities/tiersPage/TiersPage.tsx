import React from 'react';
import { getAllTiers } from '../../../../features/tier/api/Tier.api';
import EntitiesPage from '../entitiesPage/EntitiesPage';
import TierList from '../../../../features/tier/components/tierList/TierList';
import { managementTierRoute } from '../../../../app/Routes';

const TiersPage = () => {
	return (
		<EntitiesPage
			title="Tiers Page"
			getEntities={getAllTiers}
			entitiesRenderer={entities => (
				<TierList tiers={entities} tierUrl={tier => managementTierRoute(tier.id!)}/>
			)}/>
	);
}

export default TiersPage;