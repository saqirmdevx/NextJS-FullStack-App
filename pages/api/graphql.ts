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

const server = new ApolloServer({
  schema,
  context,
  plugins: [
    process.env.NEXT_PUBLIC_NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

const startServer = server.start();

export default async (req: NextApiRequest, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if (req.method === 'OPTIONS') {
    res.end();
    return false
  }

  await startServer

  await server.createHandler({
    path: "/api/graphql"
  })(req, res)
}