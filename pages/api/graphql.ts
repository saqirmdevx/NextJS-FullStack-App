import { ApolloServer } from 'apollo-server-micro';
import {Schema} from "../../src/api/utils/schema";
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

const server = new ApolloServer({
  schema: Schema,
  context,
  plugins: [
    process.env.NEXT_PUBLIC_NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

const startServer = server.start();

export default async (req: NextApiRequest, res: ServerResponse) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false
  }

  await startServer

  await server.createHandler({
    path: "/api/graphql"
  })(req, res)
}