import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink, HttpLink } from "@apollo/react-hooks";

// This can be placed in .env
const httpLink = new HttpLink({ uri: "/api/graphql"});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem('user');

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
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;