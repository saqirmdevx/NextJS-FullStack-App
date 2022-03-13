import { mergeResolvers } from '@graphql-tools/merge';
import blog from './blog';

// Resolvers
import user from "./user/"

export default mergeResolvers([
    user,
    blog
])