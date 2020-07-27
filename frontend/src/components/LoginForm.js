import React, { useState, useEffect } from 'react';
import {Form, Button} from 'semantic-ui-react';
import { useQuery, gql, useMutation } from '@apollo/client';

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

const SIGN_IN = gql`
mutation SignIn($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
`;

const LoginForm = (props) => {
    const [isLogged, setLogin] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        console.log(isLogged, 'use effect hook')
        
    });
    const { loading, error, data } = useQuery(GET_POSTS);
    const [signIn, { loadingMutation }] = useMutation(SIGN_IN);
    return (
        <Form
        onSubmit={e => {
            e.preventDefault();
            signIn(
                { variables: { email: email, password: password },
            }).then((response => {
                if(response.data.login) {
                    localStorage.setItem('token', response.data.login)
                    setLogin(true)
                    console.log(isLogged, 'before prop')
                    props.onLogin(isLogged)
                }
            })).catch(err => {
                console.log(err)
            })
            setEmail('')
            setPassword('')
        }}>
            <Form.Field>
                <label>Email</label>
                <input placeholder='Email' onChange={(e) => {setEmail(e.target.value)}} />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input type='password' placeholder='Password' onChange={(e) => {setPassword(e.target.value)}}  />
            </Form.Field>
            <Button type='submit'>Login</Button>
        </Form>
    );
}

export default LoginForm;