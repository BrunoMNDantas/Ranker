import React from 'react';
import { getAllRanks } from '../../../../features/rank/api/Rank.api';
import EntitiesPage from '../entitiesPage/EntitiesPage';
import RankList from '../../../../features/rank/components/rankList/RankList';
import { managementRankRoute } from '../../../../app/Routes';

const RanksPage = () => {
	return (
		<EntitiesPage
			title="Ranks Page"
			getEntities={getAllRanks}
			entitiesRenderer={entities => (
				<RankList ranks={entities} rankUrl={rank => managementRankRoute(rank.id!)}/>
			)}/>
	);
}

export default RanksPage;