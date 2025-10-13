import { ComponentType } from 'react';
import classes from './EntityBreadcrumbs.module.css';
import { Breadcrumbs, BreadcrumbsProps, Link, SvgIconProps } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export interface Part {
    name: string
    href: string
    Icon: ComponentType<SvgIconProps>
}

export interface EntityBreadcrumbsProps extends BreadcrumbsProps {
    links: Part[]
}

const EntityBreadcrumbs = ({ links, ...props }: EntityBreadcrumbsProps) => {
    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} {...props}>
            {
                links.map(link => (
                    <Link underline="hover" color="inherit" className={classes.link} href={link.href}>
                        {<link.Icon sx={{ mr: 0.5 }} fontSize="inherit"/>}
                        {link.name}
                    </Link>
                ))
            }
        </Breadcrumbs>
    );
}

export default EntityBreadcrumbs;