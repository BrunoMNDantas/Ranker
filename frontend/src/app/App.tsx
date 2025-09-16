import React from 'react';
import classes from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import AppLayout from '../layouts/appLayout/AppLayout';
import AppRankPage from '../pages/rankPage/RankPage';
import AppRanksPage from '../pages/ranksPage/RanksPage';
import AppOptionPage from '../pages/optionPage/OptionPage';
import AppTierPage from '../pages/tierPage/TierPage';
import AppVotePage from '../pages/votePage/VotePage';
import AppAssignmentPage from '../pages/assignmentPage/AssignmentPage';
import ManagementLayout from '../layouts/managementLayout/ManagementLayout';
import ManagementRanksPage from '../pages/management/entities/ranksPage/RanksPage';
import ManagementRankPage from '../pages/management/entity/rankPage/RankPage';
import ManagementTiersPage from '../pages/management/entities/tiersPage/TiersPage';
import ManagementTierPage from '../pages/management/entity/tierPage/TierPage';
import ManagementOptionsPage from '../pages/management/entities/optionsPage/OptionsPage';
import ManagementOptionPage from '../pages/management/entity/optionPage/OptionPage'
import ManagementVotesPage from '../pages/management/entities/votesPage/VotesPage';
import ManagementVotePage from '../pages/management/entity/votePage/VotePage';
import ManagementAssignmentsPage from '../pages/management/entities/assignmentsPage/AssignmentsPage';
import ManagementAssignmentPage from '../pages/management/entity/assignmentPage/AssignmentPage';
import EntryPage from '../pages/entryPage/EntryPage';
import {
    ROOT_ROUTE, APP_ROUTE, MANAGEMENT_ROUTE,
    RANK_SUB_ROUTE, TIER_SUB_ROUTE, OPTION_SUB_ROUTE, VOTE_SUB_ROUTE, ASSIGNMENT_SUB_ROUTE,
    ASSIGNMENTS_SUB_ROUTE, VOTES_SUB_ROUTE, OPTIONS_SUB_ROUTE, TIERS_SUB_ROUTE, RANKS_SUB_ROUTE
} from './Routes';

const App = () => {
    return (
        <div className={classes.root}>
            <Routes>
                <Route path={ROOT_ROUTE} element={<EntryPage/>} />

                <Route path= {APP_ROUTE} element={<AppLayout/>}>
                    <Route index element={<AppRanksPage/>} />
                    <Route path={RANKS_SUB_ROUTE} element={<AppRanksPage/>} />
                    <Route path={RANK_SUB_ROUTE} element={<AppRankPage/>} />
                    <Route path={OPTION_SUB_ROUTE} element={<AppOptionPage/>} />
                    <Route path={TIER_SUB_ROUTE} element={<AppTierPage/>} />
                    <Route path={VOTE_SUB_ROUTE} element={<AppVotePage/>} />
                    <Route path={ASSIGNMENTS_SUB_ROUTE} element={<AppAssignmentPage/>} />
                </Route>

                <Route path= {MANAGEMENT_ROUTE} element={<ManagementLayout/>}>
                    <Route index element={<ManagementRanksPage/>} />
                    <Route path={RANKS_SUB_ROUTE} element={<ManagementRanksPage/>} />
                    <Route path={RANK_SUB_ROUTE} element={<ManagementRankPage/>} />
                    <Route path={TIERS_SUB_ROUTE} element={<ManagementTiersPage/>} />
                    <Route path={TIER_SUB_ROUTE} element={<ManagementTierPage/>} />
                    <Route path={OPTIONS_SUB_ROUTE} element={<ManagementOptionsPage/>} />
                    <Route path={OPTION_SUB_ROUTE} element={<ManagementOptionPage/>} />
                    <Route path={VOTES_SUB_ROUTE} element={<ManagementVotesPage/>} />
                    <Route path={VOTE_SUB_ROUTE} element={<ManagementVotePage/>} />
                    <Route path={ASSIGNMENTS_SUB_ROUTE} element={<ManagementAssignmentsPage/>} />
                    <Route path={ASSIGNMENT_SUB_ROUTE} element={<ManagementAssignmentPage/>} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;