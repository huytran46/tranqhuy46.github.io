import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {Route, Routes} from 'react-router-dom';

import ApplicationLayout from './layouts/Application.layout';
import HomeView from './views/Home';
import JokeDetail from './views/JokeDetail';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<ApplicationLayout />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/joke/:jokeId" element={<JokeDetail />} />
        </Route>
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
