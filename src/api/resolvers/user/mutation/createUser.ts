import { register } from "../../../auth/auth";
import { MutationCreateUserArgs } from "../../../../generated/graphql";
import { IRequestContext } from "../../../utils/requestContext";

const newUser =  async (_: unknown, {input}: MutationCreateUserArgs, context: IRequestContext) => await register(input.name, input.password, context);

export default newUser;