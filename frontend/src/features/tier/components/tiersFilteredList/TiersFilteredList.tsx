import TiersList, { TiersListProps } from '../tiersList/TiersList';
import EntityFilteredList from '../../../../components/entityFilteredList/EntityFilteredList';
import { useAppSelector } from '../../../../app/hooks';
import { selectTiersByIds } from '../../store/Tier.selectors';

const TiersFilteredList = ({ tierIds, ...props }: TiersListProps) => {
    const tiers = useAppSelector(state => selectTiersByIds(state, tierIds))

    const handleFilter = (text: string) => {
        const lowerCaseText = text.toLowerCase()
        return tiers.filter(tier => tier.title?.toLowerCase().includes(lowerCaseText))
    }

    return (
        <EntityFilteredList onFilter={handleFilter}>
            <TiersList tierIds={tiers.map(t => t.id)} {...props}/>
        </EntityFilteredList>
    )
}

export default TiersFilteredList;