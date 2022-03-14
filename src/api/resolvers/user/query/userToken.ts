import {  } from "../../../../generated/graphql";
import { decode } from "../../../auth/jwt";
import { IRequestContext } from "../../../utils/requestContext";

const refreshToken = async (_: unknown, {token}: {token: string}, context: IRequestContext) => {
    const user = decode(token);

    return {
        ...user
    }
}

export default refreshToken;