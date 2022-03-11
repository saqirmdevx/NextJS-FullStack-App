
import { User } from "../../../generated/graphql";
import { IRequestContext } from "../../utils/requestContext";
import user from "./query/user";

export default {
    Query: {
        user,
    },
    User: {
        blogs: async (parent: User, _: undefined, context: IRequestContext) => await context.prisma.blog.findMany({where: { authorId: parent.id }})
    }
}