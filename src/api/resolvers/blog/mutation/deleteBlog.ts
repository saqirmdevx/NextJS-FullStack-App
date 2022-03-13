import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { IRequestContext } from "../../../utils/requestContext";

const deleteBlog =  async (_: unknown, {id}: {id: number}, context: IRequestContext) => {
    /** Find blog if it belong to authorized user */
    const blog = await context.prisma.blog.findUnique({where: {id}});

    if (!blog) {
        return new UserInputError("Blog does not exists");
    }

    if (blog.authorId !== context.user?.id) {
        return new AuthenticationError("Unauthorized");
    }

    return await context.prisma.blog.delete({
        where: {
            id: id,
        },
    })
}

export default deleteBlog;