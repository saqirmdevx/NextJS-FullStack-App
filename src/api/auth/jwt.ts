import { User } from "@prisma/client";
import { AuthenticationError } from "apollo-server-micro";
import JWT, { JwtPayload } from "jsonwebtoken";

export interface IJWTTokenData extends JwtPayload {
    id: number
    name: string
}

/**
 * Generate JWT Token based on user data
 * @param user - User data - Prisma user type
 * @returns JWT Token with user data
 */
export const generateToken = (user: User) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    if (!jwtSecretKey)
        throw new Error("process.env.JWT_SECRET_KEY in /src/auth/jwt.ts is not defined!");

    let data: JwtPayload = {
        id: user.id,
        name: user.name,
    }

    const expirationTime = Math.floor(Date.now() / 1000) + (60 * 150); // Expiration time to 2.5 Hours (150 min)

    const token = JWT.sign(data, jwtSecretKey, { expiresIn: expirationTime });

    return token;
}

/**
 * Decode JWT token and validate if user data are correct
 * @param token - JWT Token (req.headers.authorization)
 * @returns Object of user data
 */
export const decode = (token: string): IJWTTokenData => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    if (!jwtSecretKey)
        throw new Error("process.env.JWT_SECRET_KEY in /src/auth/jwt.ts is not defined!");

    const data = JWT.decode(token) as IJWTTokenData;

    if (data === null)
        throw new AuthenticationError("Your authentication is not longer valid");

    return data;
}