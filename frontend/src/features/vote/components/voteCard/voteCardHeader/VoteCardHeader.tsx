import React, { HTMLAttributes } from 'react';
import { Vote } from '../../../model/Vote.types';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import VoteAvatar from '../../voteAvatar/VoteAvatar';

export interface VoteCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    vote: Vote
}

const VoteCardHeader = ({ vote, ...props }: VoteCardHeaderProps) => {
    return (
        <EntityCardHeader
            avatar={<VoteAvatar vote={vote}/>}
            name={vote.id!}
            creationDate={vote.creationDate!}
            {...props}/>
    );
}

export default VoteCardHeader;