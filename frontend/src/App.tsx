import React from 'react';
import classes from './App.module.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RankPage from './ui/pages/rank/RankPage';
import TierPage from './ui/pages/tier/TierPage';
import OptionPage from './ui/pages/option/OptionPage';
import VotePage from './ui/pages/vote/VotePage';
import RanksPage from './ui/pages/ranks/RanksPage';
import TiersPage from './ui/pages/tiers/TiersPage';
import OptionsPage from './ui/pages/options/OptionsPage';
import VotesPage from './ui/pages/votes/VotesPage';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";


const App = () => {
    const navigate = useNavigate()

    return (
        <div className={classes.app}>
            <div className={classes.title}>RANKER</div>

            <div className={classes.content}>
                <Routes>
                    <Route path="/rank" element={<RanksPage/>} />
                    <Route path="/rank/:rankId" element={<RankPage/>} />
                    <Route path="/tier" element={<TiersPage/>} />
                    <Route path="/tier/:tierId" element={<TierPage/>} />
                    <Route path="/option" element={<OptionsPage/>} />
                    <Route path="/option/:optionId" element={<OptionPage/>} />
                    <Route path="/vote" element={<VotesPage/>} />
                    <Route path="/vote/:voteId" element={<VotePage/>} />
                </Routes>
            </div>

             <BottomNavigation showLabels>
                <BottomNavigationAction label="Ranks" onClick={() => navigate("Rank")}/>
                <BottomNavigationAction label="Tiers" onClick={() => navigate("Tier")}/>
                <BottomNavigationAction label="Options" onClick={() => navigate("Option")}/>
                <BottomNavigationAction label="Votes" onClick={() => navigate("Vote")}/>
            </BottomNavigation>
        </div>
    );
}

export default App;