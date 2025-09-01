import React from 'react';
import { getAllOptions } from '../../../../../logic/api/Option.api';
import EntitiesPage from '../entitiesPage/EntitiesPage';

const OptionsPage = () => {
	return (
		<EntitiesPage
			title="Options Page"
			getEntityUrl={option => "/management/option/" + option.id}
			getEntities={getAllOptions}
			entityRenderer={option => <div>{ option.title }</div>}/>
	);
}

export default OptionsPage;