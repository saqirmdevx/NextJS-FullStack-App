import { MutationLikeBlogArgs } from "../../../../generated/graphql";
import { IRequestContext } from "../../../utils/requestContext";
import { UserInputError } from "apollo-server-micro";

const likeUser =  async (_: unknown, {id}: MutationLikeBlogArgs, context: IRequestContext) => {
    /** Find blog if it belong to authorized user */
    const blog = await context.prisma.blog.findUnique({where: {id}});

    if (!blog) {
        return new UserInputError("Blog does not exists");
    }

    if (blog.authorId === context.user?.id) {
        return new UserInputError("You can not like your own blog");
    }

    return await context.prisma.blog.update({where: {id}, data: {likes: {increment: 1}}});
}

export default likeUser;