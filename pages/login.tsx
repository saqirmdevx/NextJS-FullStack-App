import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-server-micro';
import type { NextPage } from 'next'
import Router from 'next/router';
import { useState } from 'react';
import { Box, Button, Flex, Input, Label, Paragraph, Spinner, Checkbox } from 'theme-ui'
import { useAuth } from '../src/auth/AuthProvider';

const LOGIN_USER = gql`
    mutation login($name: String!, $pass: String!) {
        login(input: {name: $name, password: $pass}) {
            token
            user {
                id
                name
            }
        }
    }
`

const Login: NextPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginUser] = useMutation(LOGIN_USER);
    const { isAuth, onLogin } = useAuth();

    /** Redirect to home if you are already loged in */
    if (isAuth)
        Router.push("/");

    const submitLogin = async () => {
        /** Check empty fields */
        if (!password.length || !username.length) {
            setResponseMessage("All fields must be completed!");
            return;
        }

        setLoading(true);
        const response = await loginUser({
            variables: {
                name: username,
                pass: password
            }, errorPolicy: "all"
        });

        if (response.errors) {
            setResponseMessage(response.errors[0].message);
            setLoading(false);

            /* Reset values **/
            setUsername("");
            setPassword("");
            setRemember(false);
            return;
        }

        const { token } = response.data.login;
        const { id, name } = response.data.login.user;

        onLogin({
            id,
            name,
            token,
            remember
        });
        setLoading(false);
        Router.push("/");
    }

    if (loading) {
        return (
            <Box as="form" sx={{ width: "40%", margin: "auto", marginTop: "10%", border: "1px solid black", borderRadius: "8px", textAlign: 'center' }} padding="64px" bg="highlight" onSubmit={(e) => e.preventDefault()}>
                <Spinner />
            </Box>
        )
    }

    return (
        <Flex as="form" sx={{ flexDirection: "column", justifyContent: "center", textAlign: "center", width: "40%", margin: "auto", marginTop: "10%", border: "1px solid black", borderRadius: "8px" }} padding="18px" bg="highlight" onSubmit={(e) => e.preventDefault()}>
            <h1> Login form </h1>
            <Label htmlFor="username">Username</Label>
            <Input
                name="username"
                mb={3}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Label htmlFor="password">Password</Label>
            <Input
                type="password"
                name="password"
                mb={3}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Label htmlFor="remember" onClick={() => setRemember(!remember)}>
                <Checkbox checked={remember} onChange={() => setRemember(!remember)} />
                Remember me
            </Label>
            <Button sx={{ marginTop: "18px" }} variant="link" onClick={submitLogin}>Login</Button>
            <Paragraph color="red"> {responseMessage} </Paragraph>
        </Flex>
    )
}

export default Login
