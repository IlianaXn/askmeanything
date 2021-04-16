import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Login from './Login.js';
import Home from './Home.js';
import NotFound from './NotFound.js';
import { BrowserRouter as Router,  Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route extact path="/login">
            <Login/>
            <Footer/>
          </Route>
          <Route extact path="/home">
            <Navbar/>
            <Home/>
            <Footer/>
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
