import React from 'react';
import { getAllOptions } from '../../../../features/option/api/Option.api';
import EntitiesPage from '../entitiesPage/EntitiesPage';
import OptionsList from '../../../../features/option/components/optionsList/OptionsList';
import { managementOptionRoute } from '../../../../app/Routes';

const OptionsPage = () => {
	return (
		<EntitiesPage
			title="Options Page"
			getEntities={getAllOptions}
			entitiesRenderer={entities => (
				 <OptionsList options={entities} optionUrl={option => managementOptionRoute(option.id!)}/>
			)}/>
	);
}

export default OptionsPage;