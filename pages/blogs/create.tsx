import { gql } from 'apollo-server-micro';
import type { NextPage } from 'next'
import { BLOG_FRAGMENT } from '..';
import BlogEditor from '../../src/components/BlogEditor';

const CREATE_BLOG = gql`
    mutation createBlog($title: String!, $body: String!) {
        createBlog(input: {title: $title, body: $body}) {
            ...blogData
        }
    }
    ${BLOG_FRAGMENT}
`

const CreateBlog: NextPage = () => BlogEditor({
    mutation: CREATE_BLOG
})

export default CreateBlog