
import { User } from "../../../generated/graphql";
import { IRequestContext } from "../../utils/requestContext";
import newUser from "./mutation/createUser";
import likeUser from "./mutation/likeUser";
import userLogin from "./mutation/login";
import user from "./query/user";
import refreshToken from "./query/userToken";

export default {
    Query: {
        user,
        refreshToken,
    },
    Mutation: {
        createUser: newUser,
        likeUser: likeUser,
        login: userLogin
    },
    User: {
        blogs: async (parent: User, _: undefined, context: IRequestContext) => await context.prisma.blog.findMany({where: { authorId: parent.id }})
    }
}