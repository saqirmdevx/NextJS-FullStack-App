import { useQuery } from '@apollo/react-hooks'
import type { NextPage } from 'next'
import { GET_ALL_BLOGS } from '..';
import { useAuth } from '../../src/auth/AuthProvider';
import BlogList from '../../src/components/BlogList';
import LoadingPage from '../../src/components/Loading';
import SkeletonBlogs from '../../src/components/SkeletonBlogs';
import Unauthorized from '../../src/components/Unauthorized';
import { Blog } from '../../src/generated/graphql'

const Blogs: NextPage = () => {
  const { isAuth, id } = useAuth();
  const { loading, data, error } = useQuery<{ allBlogs: Blog[] }>(GET_ALL_BLOGS, { variables: { id }, errorPolicy: "ignore" });

  if (!isAuth)
    return Unauthorized();

  if (loading)
    return <SkeletonBlogs />

  if (!data || error) {
    return <LoadingPage error={error} />;
  }

  return BlogList({blogList: data.allBlogs.filter(blog => blog.authorId === id)})
}

export default Blogs