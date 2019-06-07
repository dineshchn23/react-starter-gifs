import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './App'

function AppRouter() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav> */}

        <Route path="/" exact component={App} />
        <Route path="/about/" component={App} />
        <Route path="/users/" component={App} />
      </div>
    </Router>
  );
}

export default AppRouter;