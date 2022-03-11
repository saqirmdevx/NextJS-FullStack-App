
import { User } from "../../../generated/graphql";
import { login } from "../../auth/auth";
import { IRequestContext } from "../../utils/requestContext";
import newUser from "./mutation/createUser";
import likeUser from "./mutation/likeUser";
import user from "./query/user";

export default {
    Query: {
        user,
    },
    Mutation: {
        createUser: newUser,
        likeUser: likeUser,
        login: login
    },
    User: {
        blogs: async (parent: User, _: undefined, context: IRequestContext) => await context.prisma.blog.findMany({where: { authorId: parent.id }})
    }
}