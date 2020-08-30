import React, { Component, useState } from 'react';
import { Form, TextArea, Icon } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client';
import { Avatar, Button } from "@material-ui/core";
import ImageIcon from '@material-ui/icons/Image';

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
  const [tweetImg, setTweetImg] = useState('');
  const [message, setMessage] = useState('');
  let input;
  return (
    <form onSubmit={e => {
      e.preventDefault();
      addPost({
        variables: { content: message },
        refetchQueries: [{ query: GET_POSTS }]
      })
      setMessage('')
    }}>
      <div className="tweetBox__input">
        <Avatar src="https://lh3.googleusercontent.com/ogw/ADGmqu8jZv4w4W3SfaWLWMISbKBGpxaxbw4Id0jI5tTO=s64-c-mo" />
        <input onChange={(e) => { setMessage(e.target.value) }} value={message} placeholder='Whats happening, bro?' type="text" />
      </div>
      <div
          className="tweetBox__imageInput"
      >
        <ImageIcon className="twetBox__imageIcon"/>
      </div>
      <Button
          type="submit"
          className="tweetBox__tweetButton"
          disabled={!message}
        >
          Tweet
        </Button>
    </form>);
}


export default NewPost;