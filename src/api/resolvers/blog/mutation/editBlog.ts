import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { MutationEditBlogArgs } from "../../../../generated/graphql";
import { IRequestContext } from "../../../utils/requestContext";

const editBlog =  async (_: unknown, {input}: MutationEditBlogArgs, context: IRequestContext) => {
    /** Find blog if it belong to authorized user */
    const blog = await context.prisma.blog.findUnique({where: {id: input.id}});

    if (!blog) {
        return new UserInputError("Blog does not exists");
    }

    if (blog.authorId !== context.user?.id) {
        return new AuthenticationError("Unauthorized");
    }

    const data = {
        body: input.body || blog.body,
        title: input.title || blog.title
    }

    return await context.prisma.blog.update({
        data,
        where: {
            id: input.id,
        },
    })
}

export default editBlog;