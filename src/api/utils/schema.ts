import { makeExecutableSchema } from "@graphql-tools/schema";
import mergedTypeDefs from "../typeDefs";
import resolvers  from "../resolvers";

const schema = makeExecutableSchema({
    typeDefs: mergedTypeDefs,
    resolvers
})

export default schema