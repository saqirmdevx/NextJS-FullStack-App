import { QueryAllBlogsArgs } from "../../../../generated/graphql";
import { IRequestContext } from "../../../utils/requestContext";

const allBlogs = async (_: unknown, { input }: QueryAllBlogsArgs, context: IRequestContext) => await context.prisma.blog.findMany({ take: input?.count || 10, skip: input?.offset || 0, orderBy: [{ created: "desc" }] });

export default allBlogs;