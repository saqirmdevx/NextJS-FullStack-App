import { useQuery } from '@apollo/react-hooks'
import type { NextPage } from 'next'
import { Spinner, Box } from 'theme-ui';
import { GET_ALL_BLOGS } from '..';
import { useAuth } from '../../src/auth/AuthProvider';
import BlogComponent from '../../src/components/Blog';
import LoadingPage from '../../src/components/Loading';
import Unauthorized from '../../src/components/Unauthorized';
import { Blog } from '../../src/generated/graphql'

const Blogs: NextPage = () => {
  const { isAuth, id, name } = useAuth();
  const { loading, data, error } = useQuery<{ allBlogs: Blog[] }>(GET_ALL_BLOGS, { variables: { id }, errorPolicy: "ignore" });

  if (!isAuth)
    return Unauthorized();

  if (loading || !data || error) {
    return <LoadingPage error={error} />;
  }

  if (!data.allBlogs.length)
    return <h1> No blogs were found </h1>

  return (
    <Box sx={{ width: "50%", margin: "auto" }}>
      {data.allBlogs.filter(blogs => blogs.authorId === id).map(blog => (
        <BlogComponent
          id={blog.id}
          body={blog.body}
          title={blog.title}
          authorName={name || "anonymous"}
          likes={blog.likes}
          authorId={blog.authorId}
          addTime={blog.addTime}
          key={blog.id}
        />
      ))}
    </Box>
  )
}

export default Blogs