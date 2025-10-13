import { HTMLAttributes } from 'react';
import { Mode } from '../../../../components/entityCard/EntityCard';
import EntityCardForm from '../../../../components/entityCard/entityCardForm/EntityCardForm';
import { useAppSelector } from '../../../../app/hooks';
import { selectVoteById } from '../../store/Vote.selectors';

export interface VoteFormProps extends HTMLAttributes<HTMLDivElement> {
    voteId: string
    mode: Mode
}

const VoteForm = ({ voteId, mode, ...props }: VoteFormProps) => {
    const vote = useAppSelector((state) => selectVoteById(state, voteId))

    if (!vote) {
        return null
    }

    return <EntityCardForm {...props}/>
}

export default VoteForm;