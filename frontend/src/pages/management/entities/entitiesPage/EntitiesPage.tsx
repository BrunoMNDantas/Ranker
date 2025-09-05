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
	getEntities: () => Promise<T[]>
	entitiesRenderer: (entities: T[]) => ReactNode[] | ReactNode
}

export const EntitiesPage = <T extends Entity,>({ title, getEntities, entitiesRenderer, ...props }: EntitiesPageProps<T>) => {
	const { result: entities, executing, error } = useExecute<T[]>(getEntities);

	return (
		<Page title={title} {...props}>
			<LoadElement loading={executing}>
				{ error ? <p>Error: {error.message}</p> : null }
				{ entities ? <div className={classes.content}> { entitiesRenderer(entities) } </div> : null }
			</LoadElement>
		</Page>
	);
};

export default EntitiesPage;