import { HTMLAttributes } from 'react';
import EntityAvatar from '../../../../components/entityAvatar/EntityAvatar';
import VoteIcon from '../voteIcon/VoteIcon';
import { useAppSelector } from '../../../../app/hooks';
import { selectVoteById } from '../../store/Vote.selectors';

export interface VoteAvatarProps extends HTMLAttributes<HTMLDivElement> {
    voteId: string
}

const VoteAvatar = ({ voteId, ...props }: VoteAvatarProps) => {
    const vote = useAppSelector(state => selectVoteById(state, voteId))

    if(!vote) {
        return null
    }

    return <EntityAvatar Icon={VoteIcon} {...props}/>
}

export default VoteAvatar;