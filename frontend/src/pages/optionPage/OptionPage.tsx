import classes from './OptionPage.module.css';
import { useParams } from 'react-router-dom';
import LoadElement from '../../components/loadElement/LoadElement';
import OptionCard from '../../features/option/components/optionCard/OptionCard';
import { Mode } from '../../components/entityCard/EntityCard';
import { useOptionPageData } from '../../features/option/hooks/UseOptionPage.hook';
import { useAuth } from '../../features/auth/components/AuthContext';

const OptionPage = () => {
	const auth = useAuth()
	const { optionId } = useParams<{ optionId: string }>()
	const { option, fetching, error } = useOptionPageData(optionId || "")

	return (
		<div className={classes.root}>
			<LoadElement loading={fetching}>
				{!fetching && error ? error.toString() : null}
				{!fetching && !error && !option ? "Entity not found!" : null}
				{!fetching && !error && option ?
					<OptionCard optionId={option.id} mode={auth.userId === option.ownerId ? Mode.EDIT : Mode.VIEW}/> :
					null
				}
			</LoadElement>
		</div>
	);
}

export default OptionPage;