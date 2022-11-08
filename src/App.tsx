import './App.scss';

import React from 'react';

import JokeCard from './components/JokeCard';

function App() {
  return (
    <div className="App">
      <JokeCard
        title="Lawyer joke"
        description='A Lawyer dies and goes to Heaven. "There must be some mistakes", the
          lawyer argues. A Lawyer dies and goes to Heaven. "There must be some
          mistakes", the lawyer argues. A Lawyer dies and goes to Heaven. "There
          must be some mistakes", the lawyer argues. A Lawyer dies and goes to
          Heaven. "There must be some mistakes", the lawyer argues.'
      />
    </div>
  );
}

export default App;
