import { HTMLAttributes } from 'react';
import EntityChip from '../../../../components/entityChip/EntityChip';
import TierAvatar from '../tierAvatar/TierAvatar';
import { useAppSelector } from '../../../../app/hooks';
import { selectTierById } from '../../store/Tier.selectors';

export interface TierChipProps extends HTMLAttributes<HTMLDivElement> {
    tierId: string
}

const TierChip = ({ tierId, children, ...props }: TierChipProps) => {
    const tier = useAppSelector(state => selectTierById(state, tierId))

    if(!tier) {
        return null
    }

    const name = tier.title? tier.title : "-"
    return (
        <EntityChip
            name={name}
            description={tier.description}
            avatar={<TierAvatar tierId={tier.id}/>}
            {...props}>
            {children}
        </EntityChip>
    );
}

export default TierChip;