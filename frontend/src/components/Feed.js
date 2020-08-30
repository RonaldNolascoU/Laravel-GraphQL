import React, { useState, useContext } from "react";
import TweetBox from "./TweetBox.js";
// import Post from "./Post";
import "./Feed.css";
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import FlipMove from "react-flip-move";
import Posts from "./Posts.js";
import LoginForm from './LoginForm';
import FilterSelect from "./FilterSelect.js";
import AuthContext from '../auth-context/AuthContext'

const GET_POSTS = gql`
  query GetPosts {
     posts(orderBy: [
         {
             field: "created_at"
             order: DESC
         }
     ]) {
      id
      content
      created_at
      author {
          name
      }
      comments {
          id
          reply
          created_at
          post {
              author {
                  name
              }
          }
      }
    }
  }
`;

const IS_LOGGED = gql`
    query GetLogin {
  	me {
          id
          email
          name
    }
}
`

function queryTweets(filter) {
    return console.log(filter);
}


const Feed = () => {
    const { loading, error, data } = useQuery(GET_POSTS);
    const { data: dataLogin, error: errorOnLogin, loading: loadingLoging, refetch } = useQuery(IS_LOGGED);
    const { user, setUser } = useContext(AuthContext);
    if(dataLogin && dataLogin.me) {
        setUser(dataLogin.me)
    }

    if (loading) return <div className="feed">Loading...</div>;
    if (error) return <div className="feed">Error :(</div>;
    if (data && data.posts.length == 0) return <p>You do not have posts yet :(</p>;

    const getLoggedState = (state) => {
        return state;
    }

    return (
        < div className="feed" >
            <div className="feed__header">
                <h2>Home</h2>
                <FilterSelect onSelectedOption={queryTweets} />
            </div>
            {
                dataLogin && !dataLogin.me ?
                    <React.Fragment>
                        <div className="feed">
                            <h3>Please login to create posts</h3>
                            <LoginForm onLogin={getLoggedState ? refetch : null}></LoginForm>
                        </div>
                    </React.Fragment>
                    :
                    <TweetBox />

            }
            {
                data.posts.map((post) => (
                    // console.log(post)
                    <Posts key={post.id} post={post} />
                ))
            };
        </div >
    );
};

export default Feed;