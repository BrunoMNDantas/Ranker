import React from 'react';
import classes from './App.module.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RankPage from './ui/pages/management/entity/rankPage/RankPage';
import TierPage from './ui/pages/management/entity/tierPage/TierPage';
import OptionPage from './ui/pages/management/entity/optionPage/OptionPage';
import VotePage from './ui/pages/management/entity/vote/VotePage';
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
                    <Route path="/management/ranks" element={<RanksPage/>} />
                    <Route path="/management/ranks/:rankId" element={<RankPage/>} />
                    <Route path="/management/tiesr" element={<TiersPage/>} />
                    <Route path="/management/tiers/:tierId" element={<TierPage/>} />
                    <Route path="/management/options" element={<OptionsPage/>} />
                    <Route path="/management/options/:optionId" element={<OptionPage/>} />
                    <Route path="/management/votes" element={<VotesPage/>} />
                    <Route path="/management/votes/:voteId" element={<VotePage/>} />
                    <Route path="/management/assignments" element={<AssignmentsPage/>} />
                    <Route path="/management/assignments/:assignmentId" element={<AssignmentPage/>} />
                </Routes>
            </div>

             <BottomNavigation showLabels>
                <BottomNavigationAction label="Ranks" onClick={() => navigate("management/ranks")}/>
                <BottomNavigationAction label="Tiers" onClick={() => navigate("management/tiers")}/>
                <BottomNavigationAction label="Options" onClick={() => navigate("management/options")}/>
                <BottomNavigationAction label="Votes" onClick={() => navigate("management/votes")}/>
                <BottomNavigationAction label="Assignments" onClick={() => navigate("management/assignments")}/>
            </BottomNavigation>
        </div>
    );
}

export default App;