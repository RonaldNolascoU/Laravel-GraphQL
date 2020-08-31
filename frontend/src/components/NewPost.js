import React, { useContext, useState } from 'react';
import { Form, TextArea, Icon } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client';
import { Avatar, Button, FlatButton } from "@material-ui/core";
import ImageIcon from '@material-ui/icons/Image';
import AuthContext from '../auth-context/AuthContext';

const GET_POSTS = gql`
  query GetPosts {
    me {
    email
     posts {
      id
      content
      image
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
mutation createPost($content: String, $image: String) {
  addPost(content: $content, image: $image) {
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
  const { user } = useContext(AuthContext);

  function handleImage(event) {
    setTweetImg(URL.createObjectURL(event.target.files[0]))
  }
  return (
    <form onSubmit={e => {
      e.preventDefault();
      addPost({
        variables: { content: message, image: tweetImg },
        refetchQueries: [{ query: GET_POSTS }]
      })
      setMessage('')
      setTweetImg('')
    }}>
      <div className="tweetBox__input">
        <Avatar src={user.avatar} />
        <input onChange={(e) => { setMessage(e.target.value) }} value={message} placeholder='Whats happening?' type="text" />
      </div>
      <div
        className="tweetBox__imageInput"
      >

        <input
          id="iconFile"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => {handleImage(e)}}
        />
        <div className="tweet__image">
          {tweetImg.length > 0 && <img src={tweetImg}/>}
        </div>
        <label htmlFor="iconFile">
          <ImageIcon className="twetBox__imageIcon" />
        </label>
      </div>
      <Button
        type="submit"
        className="tweetBox__tweetButton"
        disabled={!message && tweetImg.length == 0}
      >
        Tweet
        </Button>
    </form>);
}


export default NewPost;