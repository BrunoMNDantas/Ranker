import * as React from 'react';
import classes from './ProfileButton.module.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import UserIcon from '../../../user/components/userIcon/UserIcon';
import { useUser } from '../../../user/hooks/UseUser.hook';
import { useAuth } from '../AuthContext';
import UserAvatar from '../../../user/components/userAvatar/UserAvatar';

export interface ProfileButtonProps {
    onProfile: () => void
    onLogout: () => void
}

const ProfileButton = ({onProfile, onLogout}: ProfileButtonProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const auth = useAuth()
    const { user } = useUser(auth.userId || "")

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className={classes.root}>
            { user ? <UserAvatar user={user} onClick={handleClick}/> : null}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <MenuItem onClick={onProfile}>
                    <ListItemIcon>
                        <UserIcon fontSize="small"/>
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    )
}

export default ProfileButton