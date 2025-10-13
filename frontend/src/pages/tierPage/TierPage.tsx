import classes from './TierPage.module.css';
import { useParams } from 'react-router-dom';
import LoadElement from '../../components/loadElement/LoadElement';
import TierCard from '../../features/tier/components/tierCard/TierCard';
import { Mode } from '../../components/entityCard/EntityCard';
import { useTierPageData } from '../../features/tier/hooks/UseTierPage.hook';
import { useAuth } from '../../features/auth/components/AuthContext';

const TierPage = () => {
	const auth = useAuth()
	const { tierId } = useParams<{ tierId: string }>()
	const { tier, fetching, error } = useTierPageData(tierId || "")

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !tier ? "Entity not found!" : null}
				{!fetching && !error && tier ?
					<TierCard tierId={tier.id} mode={auth.userId === tier.ownerId ? Mode.EDIT : Mode.VIEW}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default TierPage;