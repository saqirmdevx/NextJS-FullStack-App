import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink, HttpLink } from "@apollo/react-hooks";

const getAuthorizationToken = () => {
    let token = localStorage.getItem("user");
    if (!token)
          token = sessionStorage.getItem("user");

    return token;
}

// This can be placed in .env
const httpLink = new HttpLink({ uri: "/api/graphql"});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = getAuthorizationToken();

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? token : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
    ssrMode: typeof window === undefined,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;