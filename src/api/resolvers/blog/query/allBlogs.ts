import {  } from "../../../../generated/graphql";
import { IRequestContext } from "../../../utils/requestContext";

const allBlogs =  async (_: unknown, __:unknown, context: IRequestContext) => await context.prisma.blog.findMany({take: 100, orderBy: [{created: "desc" }]});

export default allBlogs;