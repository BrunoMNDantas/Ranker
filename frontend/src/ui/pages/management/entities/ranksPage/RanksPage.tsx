import React from 'react';
import { getAllRanks } from '../../../../../logic/api/Rank.api';
import EntitiesPage from '../entitiesPage/EntitiesPage';

const RanksPage = () => {
	return (
		<EntitiesPage
			title="Ranks Page"
			getEntityUrl={rank => "/management/ranks/" + rank.id}
			getEntities={getAllRanks}
			entityRenderer={rank => <div>{ rank.title }</div>}/>
	);
}

export default RanksPage;