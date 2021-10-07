import React from 'react';
import {BrowserRouter , Switch, Route} from 'react-router-dom';
import { About} from './components/About'
import {Navbar} from './components/Navbar'
import {User} from './components/User'


function App(){
  return (
    <BrowserRouter>
    <Navbar/>
      <div className="container p-4">
        <Switch>
          <Route path="/about" component={About}/>
          <Route path="/" component={User}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
