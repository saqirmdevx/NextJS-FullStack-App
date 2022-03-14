import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-server-micro'
import type { NextPage } from 'next'
import { Spinner, Box } from 'theme-ui';
import { BLOG_FRAGMENT } from '..';
import { useAuth } from '../../src/auth/AuthProvider';
import BlogComponent from '../../src/components/Blog';
import Unauthorized from '../../src/components/Unauthorized';
import { Blog } from '../../src/generated/graphql'

const GET_MY_BLOGS = gql`
  query authorBlogs($id: Int!) {
    authorBlogs(authorId: $id) {
      ...blogData
    }
  }
  ${BLOG_FRAGMENT}
`;

const Blogs: NextPage = () => {
  const { isAuth, id, name } = useAuth();
  const { loading, data, error } = useQuery<{ authorBlogs: Blog[] }>(GET_MY_BLOGS, { variables: { id }, errorPolicy: "ignore" });

  if (!isAuth)
    return Unauthorized();

  if (loading || !data?.authorBlogs) {
    return <Spinner sx={{ margin: "auto" }} />
  }

  if (error) {
    return <h1> {error.message} </h1>
  }

  return (
    <Box sx={{ width: "40%", margin: "auto" }}>
      {data.authorBlogs.map(blog => {
        return <BlogComponent
          id={blog.id}
          body={blog.body}
          title={blog.title}
          authorName={name || "anonymous"}
          likes={blog.likes}
          authorId={blog.authorId}
          addTime={blog.addTime}
          key={blog.id}
        />
      })}
    </Box>
  )
}

export default Blogs