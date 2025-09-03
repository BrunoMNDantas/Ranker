import React, { HTMLAttributes } from 'react';
import { useExecute } from '../../../../../logic/hooks/UseExecute';
import Page from '../../../page/Page';
import { Entity } from '../../../../../logic/api/Store';
import LoadElement from '../../../../components/loadElement/LoadElement';

export interface EntityPageProps<T extends Entity> extends HTMLAttributes<HTMLDivElement> {
	title: string
	getEntity: () => Promise<T|null>
	EntityForm: React.ComponentType<{ entity: T }>
}

export const EntityPage = <T extends Entity,>({ title, getEntity, EntityForm, ...props }: EntityPageProps<T>) => {
	const { result: entity, executing, error } = useExecute<T|null>(getEntity);

	return (
		<Page title={title} {...props}>
			<LoadElement loading={executing}>
				{error ? <p>Error: {error.message}</p> : null}
				{!executing && !error && !entity ? "Entity not found!" : null}
				{!executing && !error && entity ? <EntityForm entity={entity}/> : null}
			</LoadElement>
		</Page>
	);
};

export default EntityPage;