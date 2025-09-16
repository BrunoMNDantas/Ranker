import React from 'react';
import { getAllRanks } from '../../../../features/rank/api/Rank.api';
import EntitiesPage from '../entitiesPage/EntitiesPage';
import RanksList from '../../../../features/rank/components/ranksList/RanksList';
import { managementRankRoute } from '../../../../app/Routes';

const RanksPage = () => {
	return (
		<EntitiesPage
			title="Ranks Page"
			getEntities={getAllRanks}
			entitiesRenderer={entities => (
				<RanksList ranks={entities} rankUrl={rank => managementRankRoute(rank.id!)}/>
			)}/>
	);
}

export default RanksPage;