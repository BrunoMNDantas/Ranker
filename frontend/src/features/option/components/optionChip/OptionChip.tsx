import React, { HTMLAttributes } from 'react';
import EntityChip from '../../../../components/entityChip/EntityChip';
import OptionAvatar from '../optionAvatar/OptionAvatar';
import { useAppSelector } from '../../../../app/hooks';
import { selectOptionById } from '../../store/Option.selectors';

export interface OptionChipProps extends HTMLAttributes<HTMLDivElement> {
    optionId: string
}

const OptionChip = ({ optionId, children, ...props }: OptionChipProps) => {
    const option = useAppSelector(state => selectOptionById(state, optionId))

    if(!option) {
        return null
    }

    const name = option.title? option.title : "-"
    return (
        <EntityChip
            name={name}
            description={option.description}
            avatar={<OptionAvatar optionId={option.id}/>}
            {...props}>
            {children}
        </EntityChip>
    );
}

export default OptionChip;