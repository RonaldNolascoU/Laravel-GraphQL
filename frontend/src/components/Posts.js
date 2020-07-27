import { Comment, Segment, Input, Form, Button, Icon } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client';
import CommentList from './CommentList';
import moment from 'moment';
const GET_POSTS = gql`
  query GetPosts {
    me {
    email
     posts {
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
  }
`;

const ADD_COMMENT = gql`
mutation AddComment($post_id: Int, $reply: String!) {
  addComment(post_id: $post_id, reply: $reply) {
    post {
      id
      title
      content
      comments {
        reply
      }
  }
}
}
`;


const parseDate = (date) => {
    return moment(date).fromNow();
}

const getLoggedState = (state) => {
    return state
}

const Posts = (props) => {
    let input;
    console.log(props)
    const [replyText, setReply] = useState(false);
    const [selectedPost, setPost] = useState(0);
    const {loading, error, data, refetch } = useQuery(GET_POSTS);
    const [addComment, { loadingMutation }] = useMutation(ADD_COMMENT);
    const [message, setMessage] = useState('');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (!data.me) return <h3>Please login to create posts
        <LoginForm onLogin={getLoggedState ? refetch : ''}></LoginForm>
    </h3>
    if (data &&  data.me.posts.length == 0) return <p>You do not have posts yet :(</p>;
    return data.me.posts.map((post) => (
        <Segment raised key={post.id}>
            <Comment.Group>
                <Comment>
                    <Comment.Avatar src='https://lh3.googleusercontent.com/ogw/ADGmqu8jZv4w4W3SfaWLWMISbKBGpxaxbw4Id0jI5tTO=s64-c-mo' />
                    <Comment.Content>
                        <Comment.Author as='a'>{post.author.name}</Comment.Author>
                        <Comment.Metadata>
                            <div>{parseDate(post.created_at)}</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>{post.content}</p>
                        </Comment.Text>
                        <Comment.Actions>
                            <Comment.Action style={{ userSelect: 'none' }} onClick={() => { setReply(!replyText); setPost(post.id) }}>Reply</Comment.Action>
                            {(replyText && selectedPost == post.id) ?
                                <Form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        addComment({
                                            variables: { post_id: selectedPost, reply: message },
                                            update: (store, { data: { addComment } }) => {
                                                try {
                                                    const data = store.readQuery({ query: GET_POSTS });
                                                    console.log(addComment.post)
                                                    data.posts.push(addComment.post)
                                                    store.writeQuery({
                                                        query: GET_POSTS,
                                                        data: {
                                                            'posts': data
                                                        }
                                                    })
                                                } catch (e) {
                                                    console.log(e)
                                                }
                                            }
                                        });
                                        setMessage('');
                                        setReply(false);
                                    }}>
                                    <Input action='Reply' disabled={loadingMutation} style={{ width: '100%' }} onChange={(e) => { setMessage(e.target.value) }} placeholder='Search...' />
                                </Form>
                                : ''
                            }
                        </Comment.Actions>
                    </Comment.Content>
                    <Comment.Group threaded>
                        <CommentList comments={post.comments}></CommentList>
                    </Comment.Group>
                </Comment>
            </Comment.Group>
        </Segment>
    ));
}



export default Posts;