import React, { HTMLAttributes, ReactNode } from 'react';
import { useExecute } from '../../../../hooks/UseExecute';
import Page from '../../../page/Page';
import { Entity } from '../../../../services/Store';
import LoadElement from '../../../../components/loadElement/LoadElement';

export interface EntityPageProps<T extends Entity> extends HTMLAttributes<HTMLDivElement> {
	title: string
	getEntity: () => Promise<T|null>,
	entityRenderer: (entity: T) => ReactNode
}

export const EntityPage = <T extends Entity,>({ title, getEntity, entityRenderer, ...props }: EntityPageProps<T>) => {
	const { result: entity, executing, error } = useExecute<T|null>(getEntity);

	return (
		<Page title={title} {...props}>
			<LoadElement loading={executing}>
				{error ? <p>Error: {error.message}</p> : null}
				{!executing && !error && !entity ? "Entity not found!" : null}
				{!executing && !error && entity ? entityRenderer(entity) : null}
			</LoadElement>
		</Page>
	);
};

export default EntityPage;