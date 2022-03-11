import {  } from "../../../../generated/graphql";
import { IRequestContext } from "../../../utils/requestContext";

const user =  async (_: unknown, {id}: {id: number}, context: IRequestContext) => await context.prisma.user.findUnique({where: {id: id}});

export default user;