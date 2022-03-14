import { IRequestContext } from "../../utils/requestContext";
import createBlog from "./mutation/createBlog";
import deleteBlog from "./mutation/deleteBlog";
import editBlog from "./mutation/editBlog";
import likeBlog from "./mutation/likeBlog";
import authorBlogs from "./query/authorBlogs";
import blog from "./query/blog";
import allBlogs from "./query/allBlogs";
import { Blog } from "@prisma/client";

export default {
    Query: {
        blog,
        allBlogs,
        authorBlogs
    },
    Mutation: {
        createBlog,
        deleteBlog,
        editBlog,
        likeBlog
    },
    Blog: {
        addTime: (parent: Blog, _: undefined, __: undefined) => Math.floor(new Date(parent.created.toString()).getTime() / 1000),
        author: async (parent: Blog, _: undefined, context: IRequestContext) => await context.prisma.user.findUnique({ where: { id: parent.authorId } })
    }
}