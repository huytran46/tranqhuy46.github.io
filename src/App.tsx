import React from 'react';
import {Route, Routes} from 'react-router-dom';

import ApplicationLayout from './layouts/Application.layout';
import HomeView from './views/Home';
import JokeDetail from './views/JokeDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ApplicationLayout />}>
        <Route path="/" element={<HomeView />} />
        <Route path="/joke/:jokeId" element={<JokeDetail />} />
      </Route>
      <Route path="*" element={<>Not found</>} />
    </Routes>
  );
}

export default App;
