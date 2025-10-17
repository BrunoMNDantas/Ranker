import classes from './RankPage.module.css';
import { useParams } from 'react-router-dom';
import LoadElement from '../../components/loadElement/LoadElement';
import RankCard from '../../features/rank/components/rankCard/RankCard';
import { Mode } from '../../components/entityCard/EntityCard';
import { useRankPageData } from '../../features/rank/hooks/UseRankPage.hook';
import { useAuth } from '../../features/auth/components/AuthContext';
import { useAppSelector } from '../../app/hooks';
import { selectRankById } from '../../features/rank/store/Rank.selectors';

const RankPage = () => {
	const auth = useAuth()
	const { rankId } = useParams<{ rankId: string }>()
	const { fetching, error } = useRankPageData(rankId || "")
	const rank = useAppSelector(state => selectRankById(state, rankId || ""))

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !rank ? "Entity not found!" : null}
				{!fetching && !error && rank ?
					<RankCard rankId={rank.id} mode={auth.userId === rank.ownerId ? Mode.EDIT : Mode.VIEW}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default RankPage;