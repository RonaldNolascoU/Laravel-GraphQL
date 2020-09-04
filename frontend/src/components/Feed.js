import React, { useState, useContext, useEffect } from "react";
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
    query GetPosts($author: [Int]) {
        posts(orderBy: [
            {
                field: "created_at"
                order: DESC
            }
        ]
            author: $author)
            {
        id
        content
        image
        created_at
        author {
            avatar
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
            avatar
        }
}
`


const Feed = () => {

    const { user, setUser } = useContext(AuthContext);
    const [posts, setPosts] = useState({});
    const [isLazy, setLazy] = useState(false);
    const [getPost, { loading: loadingPosts, data: dataPosts }] = useLazyQuery(GET_POSTS);
    const { loading, error, data, refetch } = useQuery(GET_POSTS, {
        skip: isLazy
    });
    const { authenticated, setAuthenticated } = useContext(AuthContext);
    const { data: dataLogin, error: errorOnLogin, loading: loadingLoging } = useQuery(IS_LOGGED);

    useEffect(() => {
        if (dataPosts && dataPosts.posts) {
            setPosts(dataPosts.posts)
        }

        if (data && data.posts) {
            setPosts(data.posts)
        }

    })

    console.log(authenticated, user, 'Feed user')


    function queryTweets(filter) {
        if (filter == 'all') {
            setLazy(false);
            refetch()
        }

        if (filter == 'mine') {
            setLazy(true);
            getPost({ variables: { author: parseInt(user.id) } })
        }
    }


    if ((!authenticated && !user.email) && dataLogin && dataLogin.me) {
        setUser(dataLogin.me)
        setAuthenticated(true);
    }

    if (loading) return <div className="feed">Loading...</div>;
    if (error) return <div className="feed">Error :(</div>;
    if (data && data.posts.length == 0) return <p>You do not have posts yet :(</p>;
    return (
        < div className="feed" >
            <div className="feed__header">
                <h2>Home</h2>
                <FilterSelect onSelectedOption={queryTweets} />
            </div>
            {
                authenticated ?
                    <TweetBox />
                    :
                    <React.Fragment>
                        <div className="feed">
                            <h3>Please login to create posts</h3>
                            <LoginForm></LoginForm>
                        </div>
                    </React.Fragment>


            }
            {
                posts && Object.values(posts).map((post) => (
                    <Posts key={post.id} post={post} />
                ))
            };
        </div >
    );
};

export default Feed;