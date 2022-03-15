import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-server-micro';
import type { NextPage } from 'next'
import Router from 'next/router';
import { useState } from 'react';
import { Box, Button, Flex, Heading, Input, Label, Paragraph, Spinner } from 'theme-ui'
import { useAuth } from '../src/auth/AuthProvider';

const CREATE_USER = gql`
    mutation createUser($name: String!, $pass: String!) {
        createUser(input: {name: $name, password: $pass}) {
            token
            user {
                id
                name
            }
        }
    }
`

const Register: NextPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("")
    const [loading, setLoading] = useState(false);
    const [createUser] = useMutation(CREATE_USER);
    const { isAuth, onLogin } = useAuth();

    /** Redirect to home if you are already loged in */
    if (isAuth)
        Router.push("/");

    const submitRegister = async () => {
        /** Check empty fields */
        if (!password.length || !username.length) {
            setResponseMessage("All fields must be completed!");
            return;
        }

        if (password.length < 6) {
            setResponseMessage("Password is too short!");
            return;
        }

        if (username.length < 4 || username.length > 20) {
            setResponseMessage("Length of username can be between 4 and 20!");
            return;
        }

        setLoading(true);
        const response = await createUser({
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
            return;
        }

        const { token } = response.data.createUser;
        const { id, name } = response.data.createUser.user;

        onLogin({
            id,
            name,
            token
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
            <Heading> Register form </Heading>
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
            <Button name="submit" variant="link" onClick={submitRegister}>Register</Button>
            <Paragraph color="red"> {responseMessage} </Paragraph>
        </Flex>
    )
}

export default Register