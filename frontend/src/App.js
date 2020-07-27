import React from 'react';
import './App.css';
import Layout from './components/Layout';
import {Header} from 'semantic-ui-react';
import Posts from './components/Posts';
import NewPost from './components/NewPost';

function App() {
  return (
    <React.Fragment>
        <Layout>
            <Header style={{marginTop:'5rem'}}>
              Twitter
            </Header>
            <NewPost/>
            <Posts/>
        </Layout>
    </React.Fragment>
  );
}

export default App;
