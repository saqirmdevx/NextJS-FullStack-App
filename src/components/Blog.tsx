import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-server-micro";
import { Badge, Box, Container, Flex, Heading, Paragraph, Text } from "theme-ui";
import { Blog } from "../generated/graphql";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    IconLookup,
    IconDefinition,
    findIconDefinition
  } from '@fortawesome/fontawesome-svg-core'
import { useAuth } from "../auth/AuthProvider";
  
  const thumbIcon: IconLookup = { prefix: "fas", iconName: "thumbs-up" }
  const thumbIconDefinition: IconDefinition = findIconDefinition(thumbIcon)
  

const LIKE_PAGE_GQL = gql`
    mutation likeBlog($input: Int) {
        likeBlog(id: $input) {
            likes
        }
    }
`

type BlogProps = Blog;

const BlogComponent = ({title, body, id, addTime, author, likes}: BlogProps) => {
    const [likePage] = useMutation(LIKE_PAGE_GQL);
    const { isAuth, name, id: userId } = useAuth();

    //const onLikePage = () => likePage({})

    return (
        <Box sx={{variant: "box.blog" }}>
            <Heading>{title}</Heading> {author?.id == userId && <Badge variant="accent">Own</Badge> }
            <Paragraph sx={{padding: "6px"}}> {body}</Paragraph>
            <Flex sx={{justifyContent: "space-between"}}>
                <Text sx={{fontSize: "1.1em"}} color="primary">{likes || 0} <FontAwesomeIcon icon={thumbIconDefinition} color="primary" /></Text>
                <Text sx={{fontStyle: "italic"}}> by <b>{author?.name} </b></Text>
            </Flex>
        </Box>
    )
}

export default BlogComponent;