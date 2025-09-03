import React from 'react';
import classes from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import RankPage from './ui/pages/managementLayout/entity/rankPage/RankPage';
import TierPage from './ui/pages/managementLayout/entity/tierPage/TierPage';
import OptionPage from './ui/pages/managementLayout/entity/optionPage/OptionPage';
import VotePage from './ui/pages/managementLayout/entity/vote/VotePage';
import RanksPage from './ui/pages/managementLayout/entities/ranksPage/RanksPage';
import TiersPage from './ui/pages/managementLayout/entities/tiersPage/TiersPage';
import OptionsPage from './ui/pages/managementLayout/entities/optionsPage/OptionsPage';
import VotesPage from './ui/pages/managementLayout/entities/votesPage/VotesPage';
import AssignmentsPage from './ui/pages/managementLayout/entities/assignmentsPage/AssignmentsPage';
import AssignmentPage from './ui/pages/managementLayout/entity/assignmentPage/AssignmentPage';
import AppPage from './ui/pages/appLayout/appPage/AppPage';
import EntryPage from './ui/pages/entryPage/EntryPage';
import {
    ROOT_ROUTE, APP_ROUTE, MANAGEMENT_ROUTE,
    MANAGEMENT_RANKS_SUB_ROUTE, MANAGEMENT_TIERS_SUB_ROUTE, MANAGEMENT_OPTIONS_SUB_ROUTE,
    MANAGEMENT_VOTES_SUB_ROUTE, MANAGEMENT_ASSIGNMENTS_SUB_ROUTE,
    MANAGEMENT_RANK_SUB_ROUTE, MANAGEMENT_TIER_SUB_ROUTE, MANAGEMENT_OPTION_SUB_ROUTE,
    MANAGEMENT_VOTE_SUB_ROUTE, MANAGEMENT_ASSIGNMENT_SUB_ROUTE
} from './Routes';
import ManagementLayout from './ui/pages/managementLayout/ManagementLayout';


const App = () => {
    return (
        <div className={classes.app}>
            <div className={classes.content}>
                <Routes>
                    <Route path={ROOT_ROUTE} element={<EntryPage/>} />

                    <Route path={APP_ROUTE} element={<AppPage/>} />

                    <Route path= {MANAGEMENT_ROUTE} element={<ManagementLayout/>}>
                        <Route index element={<RanksPage/>} />
                        <Route path={MANAGEMENT_RANKS_SUB_ROUTE} element={<RanksPage/>} />
                        <Route path={MANAGEMENT_RANK_SUB_ROUTE} element={<RankPage/>} />
                        <Route path={MANAGEMENT_TIERS_SUB_ROUTE} element={<TiersPage/>} />
                        <Route path={MANAGEMENT_TIER_SUB_ROUTE} element={<TierPage/>} />
                        <Route path={MANAGEMENT_OPTIONS_SUB_ROUTE} element={<OptionsPage/>} />
                        <Route path={MANAGEMENT_OPTION_SUB_ROUTE} element={<OptionPage/>} />
                        <Route path={MANAGEMENT_VOTES_SUB_ROUTE} element={<VotesPage/>} />
                        <Route path={MANAGEMENT_VOTE_SUB_ROUTE} element={<VotePage/>} />
                        <Route path={MANAGEMENT_ASSIGNMENTS_SUB_ROUTE} element={<AssignmentsPage/>} />
                        <Route path={MANAGEMENT_ASSIGNMENT_SUB_ROUTE} element={<AssignmentPage/>} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;