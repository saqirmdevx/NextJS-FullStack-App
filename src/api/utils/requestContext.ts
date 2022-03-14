import { PrismaClient, User } from "@prisma/client";
import { ContextFunction } from "apollo-server-core";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { NextApiRequest, NextApiResponse } from "next";
import { decode, IJWTTokenData } from "../auth/jwt";

export type JWTUser = IJWTTokenData|null
export interface IRequestContext {
    prisma: PrismaClient
    user: JWTUser
}

let prisma = (global as any).prisma;

if (!prisma) {
    // Create Prisma client and push it to context
    prisma = new PrismaClient();

    //** For edevelopemnt prevet from Re-enstablishing database */
    (global as any).prisma = prisma;
}

const requestContext: ContextFunction = ({req}) => {
    let user: JWTUser = null;
    if (req.headers?.authorization) 
        user = decode(req.headers.authorization);

    // Login here
    return {
        prisma,
        user
    }

}

export default requestContext;