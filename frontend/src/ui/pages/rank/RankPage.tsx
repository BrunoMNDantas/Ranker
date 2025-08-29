import React from 'react';
import { useParams } from 'react-router-dom';

const RankPage = () => {
	const { rankId } = useParams<{ rankId: string }>();

	return (
		<div>
			Rank Page {rankId}
		</div>
	);
}

export default RankPage;