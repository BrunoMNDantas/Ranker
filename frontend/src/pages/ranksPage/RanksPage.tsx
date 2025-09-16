import React from 'react';
import classes from './RanksPage.module.css';
import { appRankRoute } from '../../app/Routes';
import { useRanks } from '../../features/rank/hooks/UseRanks.hook';
import RanksFilteredList from '../../features/rank/components/ranksFilteredList/RanksFilteredList';
import LoadElement from '../../components/loadElement/LoadElement';

const RanksPage = () => {
	const {ranks, error, fetching} = useRanks()

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				<RanksFilteredList ranks={ranks || []} rankUrl={rank => appRankRoute(rank.id!)}/>
				{error ? error.toString() : null}
			</LoadElement>
		</div>
	)
}

export default RanksPage;