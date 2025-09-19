import React, { HTMLAttributes, useState } from 'react';
import { createRank } from '../../../../services/EntityFactory.service';
import{ Mode } from '../../../../components/entityCard/EntityCard'
import EntityFormModal from '../../../../components/entityFormModal/EntityFormModal';
import { Rank } from '../../model/Rank.types';
import RankCardHeader from '../rankCard/rankCardHeader/RankCardHeader';
import RankCardForm from '../rankCard/rankCardForm/RankCardForm';
import RankIcon from '../rankIcon/RankIcon';

export interface RankFormModalProps extends HTMLAttributes<HTMLDivElement> {
    open: boolean
    defaultRank: Rank
    onCreate: (rank: Rank) => Promise<void>
}

const RankFormModal = ({ open, defaultRank, onCreate, ...props }: RankFormModalProps) => {
    const [rank, setRank] = useState(createRank(defaultRank))

    const modalHeader = <RankCardHeader rank={rank} showBreadcrumbs={false}/>
    const modalForm = <RankCardForm rank={rank} onRankChange={setRank} mode={Mode.EDIT}/>

    return (
        <EntityFormModal
            open={open}
            modalHeader={modalHeader}
            modalForm={modalForm}
            entityIcon={<RankIcon/>}
            onCreate={() => onCreate(rank)}
            {...props}/>
    );
}

export default RankFormModal;