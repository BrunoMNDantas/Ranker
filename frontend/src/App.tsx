import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RankPage from './ui/pages/rank/RankPage';
import TierPage from './ui/pages/tier/TierPage';
import OptionPage from './ui/pages/option/OptionPage';
import VotePage from './ui/pages/vote/VotePage';

const App = () => {
  return (
    <div className="App">
      RANKER
      <Routes>
        <Route path="/rank/:rankId" element={<RankPage/>} />
        <Route path="/tier/:tierId" element={<TierPage/>} />
        <Route path="/option/:optionId" element={<OptionPage/>} />
        <Route path="/vote/:voteId" element={<VotePage/>} />
      </Routes>
    </div>
  );
}

export default App;