import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-server-micro';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { BLOG_FRAGMENT } from '../..';
import BlogEditor from '../../../src/components/BlogEditor';
import LoadingPage from '../../../src/components/Loading';
import { Blog } from '../../../src/generated/graphql';

const EDIT_BLOG = gql`
    mutation editBlog($id: Int! $title: String!, $body: String!) {
        editBlog(input: {title: $title, body: $body, id: $id}) {
            ...blogData
        }
    }
    ${BLOG_FRAGMENT}
`

const GET_SINGLE_BLOG = gql`
    query blog($id: Int!) {
        blog(id: $id) {
            ...blogData
        }
    }
    ${BLOG_FRAGMENT}
`

const EditBlog: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { loading, error, data } = useQuery<{blog: Blog}>(GET_SINGLE_BLOG, {variables: {id: Number(id)}});

    if (loading || !data || error) {
        return <LoadingPage error={error} />;
    }

    return (<BlogEditor
        mutation={EDIT_BLOG}
        body={data.blog.body}
        id={data.blog.id}
        title={data.blog.title}
    />)
}

export default EditBlog;