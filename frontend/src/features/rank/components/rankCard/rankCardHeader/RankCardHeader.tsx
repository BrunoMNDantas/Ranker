import React, { HTMLAttributes } from 'react';
import { Rank } from '../../../model/Rank.types';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import RankAvatar from '../../rankAvatar/RankAvatar';
import EntityProperty from '../../../../../components/entityProperty/EntityProperty';
import RankBreadcrumbs from '../../rankBreadcrumbs/RankBreadcrumbs';

export interface RankCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
    showBreadcrumbs?: boolean
    showCreationDate?: boolean
    showDescription?: boolean
}

const RankCardHeader = ({ rank, showBreadcrumbs=true, showCreationDate=true, showDescription=true, ...props }: RankCardHeaderProps) => {
    const title = rank.title
    const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(rank.creationDate)
    const description = rank.description

    return (
        <EntityCardHeader avatar={<RankAvatar rankId={rank.id}/>} {...props}>
            { showBreadcrumbs ? <RankBreadcrumbs rankId={rank.id}/> : null }
            <EntityProperty value={title} variant='h6'/>
            { showCreationDate ? <EntityProperty value={date} variant='caption'/> : null }
            { showDescription ? <EntityProperty value={description} variant='caption'/> : null }
        </EntityCardHeader>
    )
}

export default RankCardHeader;