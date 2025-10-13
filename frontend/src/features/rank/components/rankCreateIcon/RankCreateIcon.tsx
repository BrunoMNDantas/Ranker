import { BadgeProps } from '@mui/material';
import EntityCreateIcon from '../../../../components/entityCreateIcon/EntityCreateIcon';
import RankIcon from '../rankIcon/RankIcon';

const RankCreateIcon = (props: BadgeProps) => {
    return <EntityCreateIcon icon={<RankIcon/>} {...props}/>
}

export default RankCreateIcon;