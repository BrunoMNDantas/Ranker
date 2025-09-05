import React, { HTMLAttributes } from 'react';
import { Option } from '../../../model/Option.types';
import EntityCardHeader from '../../../../../components/entityCard/entityCardHeader/EntityCardHeader';
import OptionAvatar from '../../optionAvatar/OptionAvatar';

export interface OptionCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    option: Option
}

const OptionCardHeader = ({ option, ...props }: OptionCardHeaderProps) => {
    return (
        <EntityCardHeader
            avatar={<OptionAvatar option={option}/>}
            name={option.title!}
            creationDate={option.creationDate!}
            {...props}/>
    );
}

export default OptionCardHeader;