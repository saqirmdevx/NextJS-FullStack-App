import { MutationLikeUserArgs } from "../../../../generated/graphql";
import { IRequestContext } from "../../../utils/requestContext";
import { UserInputError } from "apollo-server-micro";

const likeUser =  async (_: unknown, {id}: MutationLikeUserArgs, context: IRequestContext) => {
    if (!context.user || context.user.id == id)
        throw new UserInputError("Operation could not be processed.")!

    return await context.prisma.user.update({where: {id}, data: {likes: {increment: 1}}});
}

export default likeUser;