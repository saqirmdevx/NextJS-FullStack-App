import { gql, useQuery } from '@apollo/react-hooks'
import type { NextPage } from 'next'
import BlogList from '../src/components/BlogList';
import LoadingPage from '../src/components/Loading';
import SkeletonBlogs from '../src/components/SkeletonBlogs';
import { Blog } from '../src/generated/graphql'

export const BLOG_FRAGMENT = gql`
  fragment blogData on Blog {
    id
    body
    title
    addTime
    likes
    authorId
  }
`

export const GET_ALL_BLOGS = gql`
  query ($count: Int, $offset: Int) {
    allBlogs(input: {count: $count, offset: $offset}) {
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
  const { loading, data, error, } = useQuery<{ allBlogs: Blog[] }>(GET_ALL_BLOGS);

  if (loading)
    return <SkeletonBlogs />

  if (!data || error) {
    return <LoadingPage error={error} />;
  }

  return BlogList({blogList: data.allBlogs});
}

export default Home
