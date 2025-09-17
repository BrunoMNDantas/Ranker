import React, { HTMLAttributes } from 'react';
import { Rank } from '../../../model/Rank.types';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import RankAvatar from '../../rankAvatar/RankAvatar';
import EntityProperty from '../../../../../components/entityProperty/EntityProperty';
import RankBreadcrumbs from '../../rankBreadcrumbs/RankBreadcrumbs';

export interface RankCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
}

const RankCardHeader = ({ rank, ...props }: RankCardHeaderProps) => {
    const title = rank.title
    const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(rank.creationDate!)

    return (
        <EntityCardHeader avatar={<RankAvatar rank={rank}/>} {...props}>
            <RankBreadcrumbs rank={rank}/>
            <EntityProperty value={title} variant='h6'/>
            <EntityProperty value={date} variant='caption'/>
        </EntityCardHeader>
    )
}

export default RankCardHeader;