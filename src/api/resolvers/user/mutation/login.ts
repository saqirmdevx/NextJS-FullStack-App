import { login } from "../../../auth/auth";
import { MutationLoginArgs } from "../../../../generated/graphql";
import { IRequestContext } from "../../../utils/requestContext";

const newUser =  async (_: unknown, {input}: MutationLoginArgs, context: IRequestContext) => await login(input.name, input.password, context);

export default newUser;