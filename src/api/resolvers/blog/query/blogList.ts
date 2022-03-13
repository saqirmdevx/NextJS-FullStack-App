import {  } from "../../../../generated/graphql";
import { IRequestContext } from "../../../utils/requestContext";

const blogList =  async (_: unknown, __:unknown, context: IRequestContext) => await context.prisma.blog.findMany({take: 100});

export default blogList;