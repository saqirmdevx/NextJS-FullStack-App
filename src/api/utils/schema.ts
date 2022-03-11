import { makeExecutableSchema } from "@graphql-tools/schema";
import mergedTypeDefs from "../typeDefs";
import resolvers from "../resolvers";
import { authDirective } from "./directives";

const authDirectiveTransformer = authDirective('Auth')

const AllDirectives = [
    authDirectiveTransformer,
]

const schema = makeExecutableSchema({
    typeDefs: mergedTypeDefs,
    resolvers,
})

export const Schema = AllDirectives.reduce(
    (acc, currentValue) => currentValue(acc),
    schema
  )