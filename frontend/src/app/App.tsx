import React from 'react';
import classes from './App.module.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../layouts/appLayout/AppLayout';
import RankPage from '../pages/rankPage/RankPage';
import RanksPage from '../pages/ranksPage/RanksPage';
import VotingPage from '../pages/VotingPage/VotingPage';
import OptionPage from '../pages/optionPage/OptionPage';
import TierPage from '../pages/tierPage/TierPage';
import VotePage from '../pages/votePage/VotePage';
import AssignmentPage from '../pages/assignmentPage/AssignmentPage';
import {
    ROOT_ROUTE, APP_ROUTE, RANK_SUB_ROUTE, TIER_SUB_ROUTE,
    OPTION_SUB_ROUTE, VOTE_SUB_ROUTE, ASSIGNMENT_SUB_ROUTE,
    RANKS_SUB_ROUTE, APP_RANKS_ROUTE, RANK_VOTE_SUB_ROUTE,
    USER_SUB_ROUTE, LOGIN_ROUTE
} from './Routes';
import UserPage from '../pages/userPage/UserPage';
import LoginPage from '../pages/loginPage/LoginPage';
import { AuthProvider } from '../features/auth/components/AuthContext';
import { PublicRoute } from '../features/auth/components/PublicRoute';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute';

const App = () => {
    return (
        <div className={classes.root}>
            <AuthProvider>
                <Routes>
                    <Route path={ROOT_ROUTE} element={<Navigate to={APP_RANKS_ROUTE} replace/>}/>

                    <Route element={<PublicRoute/>}>
                        <Route path={LOGIN_ROUTE} element={<LoginPage/>}/>
                    </Route>

                    <Route element={<ProtectedRoute/>}>
                        <Route path={APP_ROUTE} element={<AppLayout/>}>
                            <Route index element={<RanksPage/>}/>
                            <Route path={USER_SUB_ROUTE} element={<UserPage/>}/>
                            <Route path={RANKS_SUB_ROUTE} element={<RanksPage/>}/>
                            <Route path={RANK_SUB_ROUTE} element={<RankPage/>}/>
                            <Route path={RANK_VOTE_SUB_ROUTE} element={<VotingPage/>}/>
                            <Route path={OPTION_SUB_ROUTE} element={<OptionPage/>}/>
                            <Route path={TIER_SUB_ROUTE} element={<TierPage/>}/>
                            <Route path={VOTE_SUB_ROUTE} element={<VotePage/>}/>
                            <Route path={ASSIGNMENT_SUB_ROUTE} element={<AssignmentPage/>}/>
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;