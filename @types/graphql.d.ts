declare module '*.graphql' {
    import { DocumentNode } from 'graphql'

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const Schema: DocumentNode

    export = Schema
}