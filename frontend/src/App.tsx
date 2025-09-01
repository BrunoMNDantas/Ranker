import React from 'react';
import classes from './App.module.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RankPage from './ui/pages/management/entity/rankPage/RankPage';
import TierPage from './ui/pages/management/entity/tierPage/TierPage';
import OptionPage from './ui/pages/management/entity/optionPage/OptionPage';
import VotePage from './ui/pages/management/entity/votePage/VotePage';
import RanksPage from './ui/pages/management/entities/ranksPage/RanksPage';
import TiersPage from './ui/pages/management/entities/tiersPage/TiersPage';
import OptionsPage from './ui/pages/management/entities/optionsPage/OptionsPage';
import VotesPage from './ui/pages/management/entities/votesPage/VotesPage';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AssignmentsPage from './ui/pages/management/entities/assignmentsPage/AssignmentsPage';
import AssignmentPage from './ui/pages/management/entity/assignmentPage/AssignmentPage';


const App = () => {
    const navigate = useNavigate()

    return (
        <div className={classes.app}>
            <div className={classes.title}>RANKER</div>

            <div className={classes.content}>
                <Routes>
                    <Route path="/management/rank" element={<RanksPage/>} />
                    <Route path="/management/rank/:rankId" element={<RankPage/>} />
                    <Route path="/management/tier" element={<TiersPage/>} />
                    <Route path="/management/tier/:tierId" element={<TierPage/>} />
                    <Route path="/management/option" element={<OptionsPage/>} />
                    <Route path="/management/option/:optionId" element={<OptionPage/>} />
                    <Route path="/management/vote" element={<VotesPage/>} />
                    <Route path="/management/vote/:voteId" element={<VotePage/>} />
                    <Route path="/management/assignment" element={<AssignmentsPage/>} />
                    <Route path="/management/assignment/:assignmentId" element={<AssignmentPage/>} />
                </Routes>
            </div>

             <BottomNavigation showLabels>
                <BottomNavigationAction label="Ranks" onClick={() => navigate("management/rank")}/>
                <BottomNavigationAction label="Tiers" onClick={() => navigate("management/tier")}/>
                <BottomNavigationAction label="Options" onClick={() => navigate("management/option")}/>
                <BottomNavigationAction label="Votes" onClick={() => navigate("management/vote")}/>
                <BottomNavigationAction label="Assignments" onClick={() => navigate("management/assignment")}/>
            </BottomNavigation>
        </div>
    );
}

export default App;