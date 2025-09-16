import React from 'react';
import classes from './TiersPage.module.css';
import { managementTierRoute } from '../../../../app/Routes';
import { useTiers } from '../../../../features/tier/hooks/UseTiers.hook';
import LoadElement from '../../../../components/loadElement/LoadElement';
import TiersFilteredList from '../../../../features/tier/components/tiersFilteredList/TiersFilteredList';

const TiersPage = () => {
	const {tiers, error, fetching} = useTiers()

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				<TiersFilteredList tiers={tiers || []} tierUrl={tier => managementTierRoute(tier.id!)}/>
				{error ? error.toString() : null}
			</LoadElement>
		</div>
	)
}

export default TiersPage;