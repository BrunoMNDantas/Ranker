import React from 'react';
import { getAllOptions } from '../../../../features/option/api/Option.api';
import EntitiesPage from '../entitiesPage/EntitiesPage';
import { managementOptionRoute } from '../../../../app/Routes';

const OptionsPage = () => {
	return (
		<EntitiesPage
			title="Options Page"
			getEntityUrl={option => managementOptionRoute(option.id!)}
			getEntities={getAllOptions}
			entityRenderer={option => <div>{ option.title }</div>}/>
	);
}

export default OptionsPage;