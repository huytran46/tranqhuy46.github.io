import './App.scss';

import React from 'react';

import Navbar from './components/NavBar';

function App() {
  return (
    <div className="cj-app">
      <Navbar />

      <div>
        this is a jumbotron with the background
        <div>
          this is imposter
          <div>
            this is form group
            <label htmlFor=""> this is a label</label>
            <p> this is a desc</p>
            <div>
              this is a input group
              <input type="text" placeholder="this is an input" />
              <span>this is icon search</span>
            </div>
          </div>
        </div>
      </div>

      <main>
        this is a body
        <div>
          this is categories list
          <span>this is category tag 1</span>
          <span>this is category tag 2</span>
          <button>this is view all button</button>
        </div>
        <hr /> divider here
        <div>
          <div>this is category tag</div>
          <div>
            this is a preview list
            <span> this is joke card 1</span>
            <span> this is joke card 2</span>
          </div>
          <button>this is view more button</button>
        </div>
      </main>

      <footer>
        this is footer with background img
        <div>
          this is imposter
          <div>
            this is call to action container
            <h5>this is call to action label</h5>
            <button>this is submit button</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
