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
import { useState } from "react";
  
const thumbIcon: IconLookup = { prefix: "fas", iconName: "thumbs-up" }
const thumbIconDefinition: IconDefinition = findIconDefinition(thumbIcon)
  

const LIKE_PAGE_GQL = gql`
    mutation likeBlog($input: Int!) {
        likeBlog(id: $input) {
            id
            likes
        }
    }
`

type BlogProps = Blog;

const BlogComponent = ({title, body, id, addTime, author, likes}: BlogProps) => {
    const [likeBlog] = useMutation(LIKE_PAGE_GQL);
    const [loading, setLoading] = useState(false);
    const { isAuth, name, id: userId } = useAuth();

    const submitLikeBlog = async (id: number) => {
        if (!isAuth)
            return;

        if (loading)
            return;

        setLoading(true);

        const response = await likeBlog({
            variables: {
                input: id,
            },
            optimisticResponse: {
                __typename: "Mutation",
                likeBlog: {
                    id,
                    likes
                }
            }
        });

        setLoading(false);
    }

    return (
        <Box sx={{variant: "box.blog" }}>
            <Heading>{title}</Heading> {author?.id == userId && <Badge variant="accent">Own</Badge> }
            <Paragraph sx={{padding: "6px"}}> {body}</Paragraph>
            <Flex sx={{justifyContent: "space-between"}}>
                <Text sx={{fontSize: "1.1em"}} color={isAuth ? "primary" : "text"}> <FontAwesomeIcon icon={thumbIconDefinition} color="primary" onClick={() => submitLikeBlog(id)}/> {likes || 0} </Text> 
                <Text sx={{fontStyle: "italic"}}> by <b>{author?.name} </b></Text>
            </Flex>
        </Box>
    )
}

export default BlogComponent;