import { BadgeProps } from '@mui/material';
import EntityCreateIcon from '../../../../components/entityCreateIcon/EntityCreateIcon';
import OptionIcon from '../optionIcon/OptionIcon';

const OptionCreateIcon = (props: BadgeProps) => {
    return <EntityCreateIcon icon={<OptionIcon/>} {...props}/>
}

export default OptionCreateIcon;