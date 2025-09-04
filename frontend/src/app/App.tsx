import React from 'react';
import classes from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import RankPage from '../pages/management/entity/rankPage/RankPage';
import TierPage from '../pages/management/entity/tierPage/TierPage';
import OptionPage from '../pages/management/entity/optionPage/OptionPage';
import VotePage from '../pages/management/entity/vote/VotePage';
import RanksPage from '../pages/management/entities/ranksPage/RanksPage';
import TiersPage from '../pages/management/entities/tiersPage/TiersPage';
import OptionsPage from '../pages/management/entities/optionsPage/OptionsPage';
import VotesPage from '../pages/management/entities/votesPage/VotesPage';
import AssignmentsPage from '../pages/management/entities/assignmentsPage/AssignmentsPage';
import AssignmentPage from '../pages/management/entity/assignmentPage/AssignmentPage';
import AppPage from '../pages/appPage/AppPage';
import EntryPage from '../pages/entryPage/EntryPage';
import {
    ROOT_ROUTE, APP_ROUTE, MANAGEMENT_ROUTE,
    MANAGEMENT_RANKS_SUB_ROUTE, MANAGEMENT_TIERS_SUB_ROUTE, MANAGEMENT_OPTIONS_SUB_ROUTE,
    MANAGEMENT_VOTES_SUB_ROUTE, MANAGEMENT_ASSIGNMENTS_SUB_ROUTE,
    MANAGEMENT_RANK_SUB_ROUTE, MANAGEMENT_TIER_SUB_ROUTE, MANAGEMENT_OPTION_SUB_ROUTE,
    MANAGEMENT_VOTE_SUB_ROUTE, MANAGEMENT_ASSIGNMENT_SUB_ROUTE
} from './Routes';
import ManagementLayout from '../layouts/managementLayout/ManagementLayout';
import AppLayout from '../layouts/appLayout/AppLayout';


const App = () => {
    return (
        <div className={classes.app}>
            <div className={classes.content}>
                <Routes>
                    <Route path={ROOT_ROUTE} element={<EntryPage/>} />

                    <Route path= {APP_ROUTE} element={<AppLayout/>}>
                        <Route index element={<AppPage/>} />
                    </Route>

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