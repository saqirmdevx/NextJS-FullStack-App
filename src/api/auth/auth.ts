import { AuthenticationError } from "apollo-server-micro";
import { IRequestContext } from "../utils/requestContext";
import { hash, compare } from "bcrypt";
import { generateToken } from "./jwt";

/**
 * Login to web-page using name and plain password, login will return JWT token
 * @param name - User name
 * @param password - User plain password
 * @param context - Apollo Server (GrahpQL Context)
 * @returns - JWT Token if sucess
 */
export const login = async (name: string, password: string, context: IRequestContext) => {
    if (context.user)
        throw new AuthenticationError("You are loged in");

    // Find Existing user in database
    const findUser = await context.prisma.user.findUnique({ where: { name } });
    if (!findUser)
        throw new AuthenticationError("Account with that combination of name and password does not exists");

    // compare hashes
    if (!await compare(password, findUser.hash))
        throw new AuthenticationError("Account with that combination of name and password does not exists");

    // Generate Token and send back
    return {
        token: generateToken(findUser),
        user: findUser,
    }
}

/**
 * Register new user in databse
 * @param name - User name
 * @param password - User plain Password
 * @param context - Apollo Context (GraphQL)
 * @returns - JWT Token
 */
export const register = async (name: string, password: string, context: IRequestContext) => {
    if (context.user)
        throw new AuthenticationError("You are loged in");

    // Find existing user, duplicates cant be created. Name msut be unique
    const findExisting = await context.prisma.user.findUnique({ where: { name } });
    if (findExisting)
        throw new AuthenticationError("Account with name already exists");

    // Generate SSH password
    const saltRound = Number(process.env.BCRYPT_SALT_ROUND) || 10;
    const hashPass = await hash(password, saltRound);

    // Create User
    const user = await context.prisma.user.create({
        data: {
            name,
            hash: hashPass,
            likes: 0,

        }
    });

    // generate JWT token and send back
    return {
        token: generateToken(user),
        user
    }
}