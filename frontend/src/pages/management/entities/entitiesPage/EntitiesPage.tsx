import React, { HTMLAttributes, ReactNode } from 'react';
import classes from './EntitiesPage.module.css';
import { useExecute } from '../../../../hooks/UseExecute';
import Page from '../../../page/Page';
import { Entity } from '../../../../services/Store';
import LoadElement from '../../../../components/loadElement/LoadElement';
import { useNavigate } from 'react-router-dom';

export interface EntityItemProps<T extends Entity> extends HTMLAttributes<HTMLDivElement> {
	url: string
	entity: T
	entityRenderer: (entity: T) => ReactNode
}

export const EntityItem = <T extends Entity,>({url, entity, entityRenderer}: EntityItemProps<T>) => {
	const navigate = useNavigate()

	return (
		<div className={classes.item} onClick = {() => navigate(url)}>
			{ entityRenderer(entity) }
		</div>
	)
}

export interface EntitiesPageProps<T extends Entity> extends HTMLAttributes<HTMLDivElement> {
	title: string
	getEntityUrl: (entity: T) => string
	getEntities: () => Promise<T[]>
	entityRenderer: (entity: T) => ReactNode
}

export const EntitiesPage = <T extends Entity,>({ title, getEntityUrl, getEntities, entityRenderer, ...props }: EntitiesPageProps<T>) => {
	const { result: entities, executing, error } = useExecute<T[]>(getEntities);

	return (
		<Page title={title} {...props}>
			<LoadElement loading={executing}>
				{ error ? <p>Error: {error.message}</p> : null }
				{
					entities?.map(entity => (
						<EntityItem
							key={entity.id}
							url={getEntityUrl(entity)}
							entity={entity}
							entityRenderer={entityRenderer}/>
					))
				}
			</LoadElement>
		</Page>
	);
};

export default EntitiesPage;