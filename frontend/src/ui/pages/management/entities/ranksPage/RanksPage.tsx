import React from 'react';
import { getAllRanks } from '../../../../../logic/api/Rank.api';
import EntitiesPage from '../entitiesPage/EntitiesPage';
import { managementRankRoute } from '../../../../../Routes';

const RanksPage = () => {
	return (
		<EntitiesPage
			title="Ranks Page"
			getEntityUrl={rank => managementRankRoute(rank.id!)}
			getEntities={getAllRanks}
			entityRenderer={rank => <div>{ rank.title }</div>}/>
	);
}

export default RanksPage;