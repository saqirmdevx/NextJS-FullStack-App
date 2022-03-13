import { } from "../../../../generated/graphql";
import { IRequestContext } from "../../../utils/requestContext";

const authorBlogs = async (_: unknown, { authorId }: { authorId: number }, context: IRequestContext) => await context.prisma.blog.findMany({ where: { authorId } });

export default authorBlogs;