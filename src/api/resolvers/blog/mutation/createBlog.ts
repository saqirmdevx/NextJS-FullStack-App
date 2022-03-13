import { AuthenticationError } from "apollo-server-micro";
import { MutationCreateBlogArgs } from "../../../../generated/graphql";
import { IRequestContext } from "../../../utils/requestContext";

const createBlog =  async (_: unknown, {input}: MutationCreateBlogArgs, context: IRequestContext) => {
    if (!context.user?.id)
        return new AuthenticationError("Unauthorized");

    return await context.prisma.blog.create({
        data: {
            authorId: context.user.id,
            ...input
        }
    })
}

export default createBlog;