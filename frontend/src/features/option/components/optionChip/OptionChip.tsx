import React, { HTMLAttributes } from 'react';
import { Option } from '../../model/Option.types';
import EntityChip from '../../../../components/entityChip/EntityChip';
import OptionAvatar from '../optionAvatar/OptionAvatar';

export interface OptionChipProps extends HTMLAttributes<HTMLDivElement> {
    option: Option
}

const OptionChip = ({ option, children, ...props }: OptionChipProps) => {
    const name = option.title? option.title : "-"
    return (
        <EntityChip
            name={name}
            description={option.description}
            avatar={<OptionAvatar option={option}/>}
            {...props}>
            {children}
        </EntityChip>
    );
}

export default OptionChip;