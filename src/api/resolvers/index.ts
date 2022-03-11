import { mergeResolvers } from '@graphql-tools/merge';

// Resolvers
import user from "./user/"

export default mergeResolvers([
    user,
])