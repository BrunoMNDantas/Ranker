import React from 'react';
import { useParams } from 'react-router-dom';
import EntityPage from '../entityPage/EntityPage';
import { getTier } from '../../../../../logic/api/Tier.api';

const TierPage = () => {
	const { tierId } = useParams<{ tierId: string }>();

	return (
		<EntityPage
			title="Tier Page"
			getEntity={() => getTier(tierId || "")}
			EntityComponent={({entity}) => <p>{entity?.id || "NOT FOUND"}</p>}/>
	);
}

export default TierPage;