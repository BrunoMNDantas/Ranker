import React from 'react';
import { getAllTiers } from '../../../../features/tier/api/Tier.api';
import EntitiesPage from '../entitiesPage/EntitiesPage';
import TiersList from '../../../../features/tier/components/tiersList/TiersList';
import { managementTierRoute } from '../../../../app/Routes';

const TiersPage = () => {
	return (
		<EntitiesPage
			title="Tiers Page"
			getEntities={getAllTiers}
			entitiesRenderer={entities => (
				<TiersList tiers={entities} tierUrl={tier => managementTierRoute(tier.id!)}/>
			)}/>
	);
}

export default TiersPage;