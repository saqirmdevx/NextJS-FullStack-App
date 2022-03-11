import { mergeTypeDefs } from '@graphql-tools/merge'

// typeDefs
import * as BlogType from "./blog.graphql";
import * as UserType from "./user.graphql";
import * as Directives from "./directives.graphql";


export default mergeTypeDefs([
    BlogType,
    UserType,
    Directives
]);