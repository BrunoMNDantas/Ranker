import React, { ReactElement, ReactNode, useState } from 'react';
import classes from './EntityCardContent.module.css';
import { CardContent, CardContentProps, Tab, Tabs } from '@mui/material';

export interface TabProps {
    icon: ReactElement
    label: string
    view: ReactNode
}

export interface EntityCardContentProps extends CardContentProps {
    tabs: TabProps[]
}

const EntityCardContent = ({ tabs, ...props }: EntityCardContentProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(1)
    const className = props.className || classes.root

    const handleTabChange = (e: any, value: number) => {
        setActiveTabIndex(value)
    }

    return (
        <CardContent className={className} {...props}>
            <Tabs className={classes.tabs} value={activeTabIndex} onChange={handleTabChange}>
                { tabs.map((tab, index) => <Tab icon={tab.icon} label={tab.label} value={index+1}/>) }
            </Tabs>
            <div className={classes.view}>
                { tabs[activeTabIndex-1].view }
            </div>
        </CardContent>
    );
}

export default EntityCardContent;