import { HTMLAttributes } from 'react';
import{ Mode } from '../../../../components/entityCard/EntityCard'
import EntityFormModal from '../../../../components/entityFormModal/EntityFormModal';
import RankCardHeader from '../rankCard/rankCardHeader/RankCardHeader';
import RankForm from '../rankForm/RankForm';
import RankCreateIcon from '../rankCreateIcon/RankCreateIcon';
import { useAppSelector } from '../../../../app/hooks';
import { selectRankById } from '../../store/Rank.selectors';

export interface RankFormModalProps extends HTMLAttributes<HTMLDivElement> {
    rankId: string
    onCreate: () => Promise<void>
    onCancel: () => Promise<void>
}

const RankFormModal = ({ rankId, onCreate, onCancel, ...props }: RankFormModalProps) => {
    const rank = useAppSelector((state) => rankId ? selectRankById(state, rankId) : null)

    const modalHeader = rank ? <RankCardHeader rankId={rank.id} showBreadcrumbs={false}/> : null
    const modalForm = rankId ? <RankForm rankId={rankId} mode={Mode.EDIT}/> : null

    return (
        <EntityFormModal
            open
            modalHeader={modalHeader}
            modalForm={modalForm}
            entityCreateIcon={<RankCreateIcon/>}
            onCancel={onCancel}
            onCreate={onCreate}
            {...props}/>
    );
}

export default RankFormModal;