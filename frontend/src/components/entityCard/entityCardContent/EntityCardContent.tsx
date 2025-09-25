import React, { ReactElement, ReactNode } from 'react';
import classes from './EntityCardContent.module.css';
import { CardContent, CardContentProps, Tab, Tabs } from '@mui/material';

export interface TabProps {
    icon: ReactElement
    label: string
    view: ReactNode
}

export interface EntityCardContentProps extends CardContentProps {
    activeTabIndex: number,
    activeTabIndexChanged: (index: number) => void
    tabs: TabProps[]
}

const EntityCardContent = ({ activeTabIndex, activeTabIndexChanged, tabs, ...props }: EntityCardContentProps) => {
    const className = props.className || classes.root

    const handleTabChange = (e: any, value: number) => {
        activeTabIndexChanged(value-1)
    }

    return (
        <CardContent className={className} {...props}>
            <Tabs className={classes.tabs} value={activeTabIndex+1} onChange={handleTabChange}>
                { tabs.map((tab, index) => <Tab icon={tab.icon} label={tab.label} value={index+1}/>) }
            </Tabs>
            <div className={classes.view}>
                { tabs[activeTabIndex].view }
            </div>
        </CardContent>
    );
}

export default EntityCardContent;