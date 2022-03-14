import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-server-micro'
import type { NextPage } from 'next'
import { Box, Spinner } from 'theme-ui';
import BlogComponent from '../src/components/Blog';
import { Blog } from '../src/generated/graphql'

const GET_ALL_BLOGS = gql`
  {
    allBlogs {
      id
      body
      title
      addTime
      author {
        name
        id
      }
    }
  }
`;

const Home: NextPage = () => {
  const { loading, data, error } = useQuery<{ allBlogs: Blog[] }>(GET_ALL_BLOGS);

  if (loading || !data) {
    return <Spinner sx={{margin: "auto"}} />
  }

  if (error) {
    return <h1> {error.message} </h1>
  }

  return (
    <Box sx={{ width: "40%", margin: "auto"}}>
      {data.allBlogs.map(blog => {
        return <BlogComponent
          id={blog.id}
          body={blog.body}
          title={blog.title}
          author={blog.author}
          likes={blog.likes}
          authorId={blog.authorId}
          key={blog.id}
        />
      })}
    </Box>
  )
}

export default Home
