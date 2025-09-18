import React from 'react';
import classes from './App.module.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../layouts/appLayout/AppLayout';
import AppRankPage from '../pages/rankPage/RankPage';
import AppRanksPage from '../pages/ranksPage/RanksPage';
import AppOptionPage from '../pages/optionPage/OptionPage';
import AppTierPage from '../pages/tierPage/TierPage';
import AppVotePage from '../pages/votePage/VotePage';
import AppAssignmentPage from '../pages/assignmentPage/AssignmentPage';

import {
    ROOT_ROUTE, APP_ROUTE, RANK_SUB_ROUTE, TIER_SUB_ROUTE,
    OPTION_SUB_ROUTE, VOTE_SUB_ROUTE, ASSIGNMENT_SUB_ROUTE,
    RANKS_SUB_ROUTE, APP_RANKS_ROUTE
} from './Routes';

const App = () => {
    return (
        <div className={classes.root}>
            <Routes>
                <Route path={ROOT_ROUTE} element={<Navigate to={APP_RANKS_ROUTE} replace/>}/>

                <Route path= {APP_ROUTE} element={<AppLayout/>}>
                    <Route index element={<AppRanksPage/>} />
                    <Route path={RANKS_SUB_ROUTE} element={<AppRanksPage/>} />
                    <Route path={RANK_SUB_ROUTE} element={<AppRankPage/>} />
                    <Route path={OPTION_SUB_ROUTE} element={<AppOptionPage/>} />
                    <Route path={TIER_SUB_ROUTE} element={<AppTierPage/>} />
                    <Route path={VOTE_SUB_ROUTE} element={<AppVotePage/>} />
                    <Route path={ASSIGNMENT_SUB_ROUTE} element={<AppAssignmentPage/>} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;