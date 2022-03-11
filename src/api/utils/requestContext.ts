import { PrismaClient } from "@prisma/client";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { NextApiResponse } from "next";

export interface IRequestContext {
    prisma: PrismaClient
}

let prisma = (global as any).prisma;

if (!prisma) {
    // Create Prisma client and push it to context
    prisma = new PrismaClient();

    //** For edevelopemnt prevet from Re-enstablishing database */
    (global as any).prisma = prisma;
}

const requestContext = (req: MicroRequest, res: NextApiResponse) => {
    if (req.headers.authorization) {
        // authoriztation
    }

    // Login here
    return {
        prisma
    }

}

export default requestContext;