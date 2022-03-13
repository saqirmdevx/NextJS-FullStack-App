import {  } from "../../../../generated/graphql";
import { IRequestContext } from "../../../utils/requestContext";

const blog =  async (_: unknown, {id}: {id: number}, context: IRequestContext) => await context.prisma.blog.findUnique({where: {id: id}});

export default blog;