import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RankPage from './ui/pages/rank/RankPage';
import TierPage from './ui/pages/tier/TierPage';
import OptionPage from './ui/pages/option/OptionPage';
import VotePage from './ui/pages/vote/VotePage';
import RanksPage from './ui/pages/ranks/RanksPage';
import TiersPage from './ui/pages/tiers/TiersPage';
import OptionsPage from './ui/pages/options/OptionsPage';
import VotesPage from './ui/pages/votes/VotesPage';

const App = () => {
  return (
    <div className="App">
      RANKER
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
  );
}

export default App;