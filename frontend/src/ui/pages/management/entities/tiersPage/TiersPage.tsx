import React from 'react';
import { getAllTiers } from '../../../../../logic/api/Tier.api';
import EntitiesPage from '../entitiesPage/EntitiesPage';

const TiersPage = () => {
	return (
		<EntitiesPage
			title="Tiers Page"
			getEntityUrl={tier => "/management/tier/" + tier.id}
			getEntities={getAllTiers}
			entityRenderer={tier => <div>{ tier.title }</div>}/>
	);
}

export default TiersPage;