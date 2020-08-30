import React from 'react';
import './App.css';
import Layout from './components/Layout';
import { Header } from 'semantic-ui-react';
import Posts from './components/Posts';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {AuthContextProvider} from './auth-context/AuthContext'

const routes = [
  {
    path: "/home",
    exact: true,
    main: () =>
      <React.Fragment>
        <Feed />
        <Widgets />
      </React.Fragment>
  },
  {
    path: "/explore",
    main: () => <h2>Explore</h2>
  },
  {
    path: "/notifications",
    main: () => <h2>Notifications</h2>
  },
  {
    path: "/messages",
    main: () => <h2>Messages</h2>
  },
  {
    path: "/bookmarks",
    main: () => <h2>Bookmarks</h2>
  },
  {
    path: "/lists",
    main: () => <h2>Lists</h2>
  },
  {
    path: "/profile",
    main: () => <h2>Profile</h2>
  },
];

function App() {
  return (
    < AuthContextProvider
      >
      <React.Fragment>
        <Router>
          <Sidebar />
          <Layout>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.main />}
                />
              ))}
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
    </ AuthContextProvider>
  );
}

export default App;
