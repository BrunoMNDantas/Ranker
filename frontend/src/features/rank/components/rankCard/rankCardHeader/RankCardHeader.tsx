import React, { HTMLAttributes } from 'react';
import { Rank } from '../../../model/Rank.types';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import RankAvatar from '../../rankAvatar/RankAvatar';

export interface RankCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
}

const RankCardHeader = ({ rank, ...props }: RankCardHeaderProps) => {
    return (
        <EntityCardHeader
            avatar={<RankAvatar rank={rank}/>}
            name={rank.title!}
            creationDate={rank.creationDate!}
            {...props}/>
    );
}

export default RankCardHeader;