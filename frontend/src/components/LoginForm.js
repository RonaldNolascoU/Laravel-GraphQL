import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useQuery, gql, useMutation } from '@apollo/client';
import  AuthContext  from '../auth-context/AuthContext';

const SIGN_IN = gql`
mutation SignIn($email: String!, $password: String!) {
  login(email: $email, password: $password) {
      id
      email
      token
  }
}
`;

const LoginForm = (props) => {
    const [isLogged, setLogin] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signIn, { loadingMutation }] = useMutation(SIGN_IN);
    const [errorOnLogin, setErrorOnLogin] = useState(false);
    const {authenticated, setAuthenticated} = useContext(AuthContext)

    const Login = async () => {
        await signIn(
            {
                variables: { email: email, password: password },
            }).then((response => {
                if (response.data.login) {
                    localStorage.setItem('token', response.data.login.token)
                    setLogin(true);
                    console.log(isLogged, 'before prop')
                    // props.onLogin(true)
                    setAuthenticated(true);
                } else {
                    setErrorOnLogin(true);
                }
            })).catch(err => {
                console.log(err)
            })
        setEmail('')
        setPassword('')
    }

    return (
            <Form>
                {errorOnLogin ?
                    <h2 className="header">Bad Login :(
                    </h2> : null}
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input type='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </Form.Field>
                <Button onClick={Login}>Login</Button>
            </Form>
    );
}

export default LoginForm;