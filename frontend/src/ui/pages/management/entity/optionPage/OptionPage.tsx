import React from 'react';
import { useParams } from 'react-router-dom';
import EntityPage from '../entityPage/EntityPage';
import {getOption } from '../../../../../logic/api/Option.api';

const OptionPage = () => {
	const { optionId } = useParams<{ optionId: string }>();

	return (
		<EntityPage
			title="Option Page"
			getEntity={() => optionId ? getOption(optionId) : Promise.resolve(null)}
			EntityComponent={({entity}) => <p>{entity?.id || "NOT FOUND"}</p>}/>
	);
}

export default OptionPage;