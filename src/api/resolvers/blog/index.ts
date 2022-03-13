
import { Blog } from "../../../generated/graphql";
import { IRequestContext } from "../../utils/requestContext";
import createBlog from "./mutation/createBlog";
import deleteBlog from "./mutation/deleteBlog";
import editBlog from "./mutation/editBlog";
import likeBlog from "./mutation/likeBlog";
import authorBlogs from "./query/authorBlogs";
import blog from "./query/blog";
import blogList from "./query/blogList";

export default {
    Query: {
        blog,
        blogList,
        authorBlogs
    },
    Mutation: {
        createBlog,
        deleteBlog,
        editBlog,
        likeBlog
    },
    Author: {
        author: async (parent: Blog, _: undefined, context: IRequestContext) => await context.prisma.user.findUnique({where: { id: parent.authorId}})
    }
}