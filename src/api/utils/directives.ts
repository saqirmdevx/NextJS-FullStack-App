import { mapSchema, MapperKind, getDirective } from "@graphql-tools/utils"
import { AuthenticationError } from "apollo-server-micro"
import { GraphQLSchema, defaultFieldResolver } from "graphql"
import { UserRole } from "../../generated/graphql"
import { IRequestContext } from "./requestContext"

const AuthError = () => new AuthenticationError("Unauthorized")!

export const authDirective = (directiveName: string) => {
    const typeDirectiveArgumentMaps: Record<string, any> = {}

    return (schema: GraphQLSchema) =>
        mapSchema(schema, {
            [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
                const directive = getDirective(schema, fieldConfig, directiveName)?.[0] ?? typeDirectiveArgumentMaps[typeName];

                if (!directive) {
                    return fieldConfig
                }

                const { userRole }: { userRole: UserRole[] | null } = directive
                const { resolve = defaultFieldResolver } = fieldConfig;
    
                // eslint-disable-next-line no-param-reassign
                fieldConfig.resolve = (source, args, context: IRequestContext, info) => {
                    if (!context.user) 
                        throw AuthError()

                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return resolve(source, args, context, info)
                }
    
                return fieldConfig
            },
        })
}