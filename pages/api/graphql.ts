import { ApolloServer } from 'apollo-server-micro';
import schema from "../../src/api/utils/schema";
import context from "../../src/api/utils/requestContext";
import { ServerResponse } from 'http';
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core'
import { NextApiRequest } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

const createServer = () => new ApolloServer({
  schema,
  context,
  plugins: [
    process.env.NEXT_PUBLIC_NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

export default async (req: NextApiRequest, res: ServerResponse) => {
  const apolloServer = createServer()
  await apolloServer.start();

  const handler = apolloServer.createHandler({
    path: "/api/graphql"
  });  // highlight-line

  return handler(req, res);
}