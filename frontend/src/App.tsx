import React from 'react';
import classes from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import RankPage from './ui/pages/management/entity/rankPage/RankPage';
import TierPage from './ui/pages/management/entity/tierPage/TierPage';
import OptionPage from './ui/pages/management/entity/optionPage/OptionPage';
import VotePage from './ui/pages/management/entity/vote/VotePage';
import RanksPage from './ui/pages/management/entities/ranksPage/RanksPage';
import TiersPage from './ui/pages/management/entities/tiersPage/TiersPage';
import OptionsPage from './ui/pages/management/entities/optionsPage/OptionsPage';
import VotesPage from './ui/pages/management/entities/votesPage/VotesPage';
import AssignmentsPage from './ui/pages/management/entities/assignmentsPage/AssignmentsPage';
import AssignmentPage from './ui/pages/management/entity/assignmentPage/AssignmentPage';
import AppPage from './ui/pages/appPage/AppPage';
import EntryPage from './ui/pages/entryPage/EntryPage';
import ManagementPage from './ui/pages/managementPage/ManagementPage';
import {
    ROOT_ROUTE, APP_ROUTE, MANAGEMENT_ROUTE,
    MANAGEMENT_ASSIGNMENT_ROUTE, MANAGEMENT_ASSIGNMENTS_ROUTE,
    MANAGEMENT_OPTION_ROUTE, MANAGEMENT_OPTIONS_ROUTE,
    MANAGEMENT_RANK_ROUTE, MANAGEMENT_RANKS_ROUTE,
    MANAGEMENT_TIER_ROUTE, MANAGEMENT_TIERS_ROUTE,
    MANAGEMENT_VOTE_ROUTE, MANAGEMENT_VOTES_ROUTE
} from './Routes';


const App = () => {
    return (
        <div className={classes.app}>
            <div className={classes.content}>
                <Routes>
                    <Route path={ROOT_ROUTE} element={<EntryPage/>} />

                    <Route path={APP_ROUTE} element={<AppPage/>} />

                    <Route path={MANAGEMENT_ROUTE} element={<ManagementPage/>} />
                    <Route path={MANAGEMENT_RANKS_ROUTE} element={<RanksPage/>} />
                    <Route path={MANAGEMENT_RANK_ROUTE} element={<RankPage/>} />
                    <Route path={MANAGEMENT_TIERS_ROUTE} element={<TiersPage/>} />
                    <Route path={MANAGEMENT_TIER_ROUTE} element={<TierPage/>} />
                    <Route path={MANAGEMENT_OPTIONS_ROUTE} element={<OptionsPage/>} />
                    <Route path={MANAGEMENT_OPTION_ROUTE} element={<OptionPage/>} />
                    <Route path={MANAGEMENT_VOTES_ROUTE} element={<VotesPage/>} />
                    <Route path={MANAGEMENT_VOTE_ROUTE} element={<VotePage/>} />
                    <Route path={MANAGEMENT_ASSIGNMENTS_ROUTE} element={<AssignmentsPage/>} />
                    <Route path={MANAGEMENT_ASSIGNMENT_ROUTE} element={<AssignmentPage/>} />
                </Routes>
            </div>
        </div>
    );
}

export default App;