import classes from './RankPage.module.css';
import { useParams } from 'react-router-dom';
import LoadElement from '../../components/loadElement/LoadElement';
import RankCard from '../../features/rank/components/rankCard/RankCard';
import { Mode } from '../../components/entityCard/EntityCard';
import { useRankPageData } from '../../features/rank/hooks/UseRankPage.hook';
import { useAuth } from '../../features/auth/components/AuthContext';

const RankPage = () => {
	const auth = useAuth()
	const { rankId } = useParams<{ rankId: string }>()
	const { rank, fetching, error } = useRankPageData(rankId || "")

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