import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-server-micro'
import type { NextPage } from 'next'
import { Box, Spinner } from 'theme-ui';
import BlogComponent from '../src/components/Blog';
import { Blog } from '../src/generated/graphql'

export const BLOG_FRAGMENT = gql`
  fragment blogData on Blog {
    id
    body
    title
    addTime
    likes
  }
`

const GET_ALL_BLOGS = gql`
  {
    allBlogs {
      ...blogData
      author {
        name
        id
      }
    }
  }
  ${BLOG_FRAGMENT}
`;

const Home: NextPage = () => {
  const { loading, data, error,  } = useQuery<{ allBlogs: Blog[] }>(GET_ALL_BLOGS);

  if (loading || !data?.allBlogs) {
    return <Spinner sx={{ margin: "auto" }} />
  }

  if (error) {
    return <h1> {error.message} </h1>
  }

  return (
    <Box sx={{ width: "40%", margin: "auto" }}>
      {data.allBlogs.map(blog => {
        return <BlogComponent
          id={blog.id}
          body={blog.body}
          title={blog.title}
          authorName={blog.author?.name || "anonymous"}
          likes={blog.likes}
          authorId={blog.authorId}
          addTime={blog.addTime}
          key={blog.id}
        />
      })}
    </Box>
  )
}

export default Home
