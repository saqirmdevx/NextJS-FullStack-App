import { Box } from "theme-ui"
import { Blog } from "../generated/graphql"
import BlogComponent from "./Blog"

interface BlogComponentProps {
    blogList: Blog[]
}

const BlogList = ({blogList}: BlogComponentProps) => {
    if (!blogList.length)
        return <h1> No blogs were found </h1>

    return (
        <Box>
            {blogList.map(blog => (
                <BlogComponent
                    id={blog.id}
                    body={blog.body}
                    title={blog.title}
                    authorName={blog.author?.name || "anonymous"}
                    likes={blog.likes}
                    authorId={blog.authorId}
                    addTime={blog.addTime}
                    key={blog.id}
                />
            ))}
        </Box>
    )
}

export default BlogList;