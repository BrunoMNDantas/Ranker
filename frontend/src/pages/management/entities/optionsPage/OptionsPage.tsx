import React from 'react';
import classes from './OptionsPage.module.css';
import { managementOptionRoute } from '../../../../app/Routes';
import { useOptions } from '../../../../features/option/hooks/UseOptions.hook';
import LoadElement from '../../../../components/loadElement/LoadElement';
import OptionsFilteredList from '../../../../features/option/components/optionsFilteredList/OptionsFilteredList';

const OptionsPage = () => {
	const {options, error, fetching} = useOptions()

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				<OptionsFilteredList options={options || []} optionUrl={option => managementOptionRoute(option.id!)}/>
				{error ? error.toString() : null}
			</LoadElement>
		</div>
	)
}

export default OptionsPage;