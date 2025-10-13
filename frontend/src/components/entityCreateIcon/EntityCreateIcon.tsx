import { ReactNode } from 'react';
import { Badge, BadgeProps } from '@mui/material';

export interface EntityCreateIconProps {
    icon: ReactNode,
    badgeProperties?: BadgeProps
}

const EntityCreateIcon = ({ icon, badgeProperties }: EntityCreateIconProps) => {
    const bagdeContent = badgeProperties?.badgeContent || "+"
    const color = badgeProperties?.color || "default"
    const overlap = badgeProperties?.overlap || "circular"
    const sx = badgeProperties?.sx || {top: "-10px", right:"-2px"}

    return (
        <>
            {icon}
            <Badge badgeContent={bagdeContent} color={color} overlap={overlap} sx={sx}/>
        </>
    );
}

export default EntityCreateIcon;