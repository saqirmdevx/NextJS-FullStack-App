import { ApolloClient, InMemoryCache } from "@apollo/client";

// This can be placed in .env
const uri = "/api/graphql";

const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
});

export default client;