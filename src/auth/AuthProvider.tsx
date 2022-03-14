import { gql } from "apollo-server-micro";
import Router from "next/router";
import { createContext, FunctionComponent, ReactNode, useContext, useEffect, useState } from "react";
import useStorage, { StorageTypes } from "../hooks/useStorage";
import client from "../utils/apolloClient";

const REFRESH_TOKEN = gql`
    query getBlog ($token: String!)  {
        refreshToken(token: $token) {
            name
            id
        }
    }
`

export interface IAuthContext {
    isAuth: boolean
    name?: string
    id?: number
    token?: string
    onLogout: () => void
    onLogin: (props: LoginProps) => void
}

interface Props {
    children: ReactNode
}

interface LoginProps {
    id: number
    name: string
    token: string

    remember?: boolean
}

const AuthContext = createContext<IAuthContext>({
    isAuth: false,
    onLogout: () => { },
    onLogin: (props: LoginProps) => { }
});

export const useAuth = (): IAuthContext => useContext(AuthContext)

const UserProvider: FunctionComponent<Props> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [id, setId] = useState<number | undefined>(undefined);
    const [name, setName] = useState("");
    const [token, setToken] = useState("");

    const { getItem, removeItem, setItem } = useStorage();

    const submitLogout = () => {
        // Clear wrong token
        setIsAuth(false);

        removeItem("user");
        Router.push("/");
    }

    const submitLogin = ({ id, name, token, remember }: LoginProps) => {
        // Clear wrong token
        setIsAuth(true);
        setId(id);
        setName(name);
        setToken(token);

        setItem("user", token, remember ? StorageTypes.LOCAL : StorageTypes.SESSION);
    }

    useEffect(() => {
        const userToken = getItem("user");
        const abortController = new AbortController();

        if (userToken) {
            client.query({
                query: REFRESH_TOKEN,
                variables: { token: userToken },
                context: {
                    fetchOptions: { signal: abortController.signal }
                }
            })
                .then((result) => {
                    setIsAuth(true);
                    setId(result.data.refreshToken.id);
                    setName(result.data.refreshToken.name);
                    setToken(userToken);
                }).catch(err => submitLogout())
        }

        return () => abortController.abort(); // Clear request if page is changed
    }, []);

    const authContext: IAuthContext = {
        isAuth,
        id,
        name,
        token,
        onLogout: submitLogout,
        onLogin: submitLogin
    }

    return (
        <AuthContext.Provider
            value={authContext}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default UserProvider;