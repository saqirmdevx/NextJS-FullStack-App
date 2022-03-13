import { login } from "../../../auth/auth";
import { MutationLoginArgs } from "../../../../generated/graphql";
import { IRequestContext } from "../../../utils/requestContext";

const userLogin =  async (_: unknown, {input: {name, password}}: MutationLoginArgs, context: IRequestContext) => await login(name, password, context);

export default userLogin;