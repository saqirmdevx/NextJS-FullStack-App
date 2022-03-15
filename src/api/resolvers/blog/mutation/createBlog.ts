import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { MutationCreateBlogArgs } from "../../../../generated/graphql";
import { IRequestContext } from "../../../utils/requestContext";

const createBlog =  async (_: unknown, {input}: MutationCreateBlogArgs, context: IRequestContext) => {
    if (!context.user?.id)
        return new AuthenticationError("Unauthorized");

    if (input.title.length > 40)
        return new UserInputError("Length of title is limited to 40");

    return await context.prisma.blog.create({
        data: {
            authorId: context.user.id,
            ...input
        }
    })
}

export default createBlog;