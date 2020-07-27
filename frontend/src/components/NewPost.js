import React, { Component, useState } from 'react';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client';

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

const ADD_POST = gql`
mutation createPost($content: String!) {
  addPost(content: $content) {
    id
    author {
      name
    }
    title
    content
    comments {
      reply
    }
  }
}
`;

const NewPost = () => {
    const [addPost, { dataMutated }] = useMutation(ADD_POST);
    const [message, setMessage] = useState('');
    let input;
    return (
        <Form onSubmit={e => {
            e.preventDefault();
            addPost({ variables: { content: message },
              refetchQueries: [{query: GET_POSTS}]})
              setMessage('')
        }}>
            <TextArea onChange={(e)=>{setMessage(e.target.value)}} placeholder='Whats happening, bro?' style={{ minHeight: 100, maxHeight: 100 }} />
            <Button icon type="submit" style={{marginTop:'1rem'}} labelPosition='right'>
                Tweet
      <Icon name='right arrow' />
            </Button>
        </Form>);
}


export default NewPost;