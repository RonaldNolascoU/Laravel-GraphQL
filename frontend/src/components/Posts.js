import { Comment, Segment, Input, Form, Button, Icon } from 'semantic-ui-react'
import React, { useState, useContext } from 'react';
import LoginForm from './LoginForm';
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client';
import CommentList from './CommentList';
import moment from 'moment';
import AuthContext from '../auth-context/AuthContext';

const GET_POSTS = gql`
  query GetPosts {
    me {
    email
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

const Posts = ({ post, logged }) => {

    const [replyText, setReply] = useState(false);
    const [selectedPost, setPost] = useState(0);
    const [addComment, { loadingMutation }] = useMutation(ADD_COMMENT);
    const [message, setMessage] = useState('');
    const {user} = useContext(AuthContext);
    console.log(user);
    return (
        <Segment raised >
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
                            {user && user.email ?
                            <Comment.Action style={{ userSelect: 'none' }} onClick={() => { setReply(!replyText); setPost(post.id) }}>Reply</Comment.Action>
                            : null
                            }

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
    )
}



export default Posts;