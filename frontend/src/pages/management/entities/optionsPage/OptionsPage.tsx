import React from 'react';
import { getAllOptions } from '../../../../features/option/api/Option.api';
import EntitiesPage from '../entitiesPage/EntitiesPage';
import OptionList from '../../../../features/option/components/optionList/OptionList';
import { managementOptionRoute } from '../../../../app/Routes';

const OptionsPage = () => {
	return (
		<EntitiesPage
			title="Options Page"
			getEntities={getAllOptions}
			entitiesRenderer={entities => (
				 <OptionList options={entities} optionUrl={option => managementOptionRoute(option.id!)}/>
			)}/>
	);
}

export default OptionsPage;