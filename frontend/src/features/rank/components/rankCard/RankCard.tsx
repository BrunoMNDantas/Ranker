import React, { HTMLAttributes, useState } from 'react';
import { Rank } from '../../model/Rank.types';
import EntityCard from '../../../../components/entityCard/EntityCard';
import { deleteRank, updateRank } from '../../api/Rank.api';
import RankCardHeader from './rankCardHeader/RankCardHeader';
import RankCardActions from './rankCardActions/RankCardActions';
import RankCardContent from './rankCardContent/RankCardContent';

export interface RankCardProps extends HTMLAttributes<HTMLDivElement> {
    rank: Rank
}

const RankCard = ({ rank, ...props }: RankCardProps) => {
    const [editedRank, setEditedRank] = useState(structuredClone(rank))

    const handleChange = (changedRank: Rank) => {
        setEditedRank(changedRank)
    }

    const handleClear = () => {
        setEditedRank(structuredClone(rank))
        return Promise.resolve()
    }

    const handleSave = () => {
        return updateRank(editedRank)
    }

    const handleDelete = () => {
        return deleteRank(rank.id!)
    }

    return (
        <EntityCard
            cardHeader={<RankCardHeader rank={editedRank}/>}
            cardContent={<RankCardContent rank={editedRank} onRankChange={handleChange}/>}
            cardActions={<RankCardActions rank={editedRank} onClear={handleClear} onSave={handleSave} onDelete={handleDelete}/>}
            {...props}/>
    );
}

export default RankCard;