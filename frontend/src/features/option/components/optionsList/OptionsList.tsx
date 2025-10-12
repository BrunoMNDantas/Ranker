import React, { HTMLAttributes, ReactNode } from 'react';
import { Option } from '../../model/Option.types';
import OptionChip from '../optionChip/OptionChip';
import EntityList from '../../../../components/entityList/EntityList';
import { useAppSelector } from '../../../../app/hooks';
import { selectOptionsByIds } from '../../store/Option.selectors';

export interface OptionsListProps extends HTMLAttributes<HTMLDivElement> {
    optionIds: string[]
    optionUrl?: (option: Option) => string
    onOptionClick?: (option: Option) => void
    chipActions?: (option: Option) => ReactNode[]
}

const OptionsList = ({ optionIds, optionUrl, onOptionClick, chipActions=()=>[], ...props }: OptionsListProps) => {
    const options = useAppSelector(state => selectOptionsByIds(state, optionIds))

    return (
        <EntityList
            entities={options}
            entityRenderer={option => <OptionChip optionId={option.id}>{chipActions(option)}</OptionChip>}
            entityUrl={optionUrl}
            onEntityClick={onOptionClick}
            {...props}/>
    )
}

export default OptionsList;