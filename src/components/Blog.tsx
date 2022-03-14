import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-server-micro";
import { Badge, Box, Button, Flex, Heading, Paragraph, Text } from "theme-ui";
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

interface BlogProps extends Blog {
    authorName: string
    newArticle?: boolean
};

const BlogComponent = ({title, body, id, authorId, authorName, likes, newArticle, addTime}: BlogProps) => {
    const [likeBlog] = useMutation(LIKE_PAGE_GQL);
    const [loading, setLoading] = useState(false);
    const { isAuth, id: userId } = useAuth();

    const toLocaleTime = (time?: number|null) => {
        if (!time)
            return;

        const date = new Date(time * 1000);

        return `${date.getDate()}/${date.getMonth() + 1} ${date.getFullYear()}`
    }

    const submitLikeBlog = async (id: number) => {
        if (!isAuth)
            return;

        if (loading)
            return;

        setLoading(true);

        await likeBlog({
            variables: {
                input: id,
            },
            errorPolicy: "ignore",
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
        <>
            {userId !== undefined && userId == authorId &&
                <Flex sx={{justifyContent: "flex-end", gap: 18, paddingRight: 18, paddingTop: 18}}>
                    <Button variant="link">Edit</Button>
                    <Button variant="link" backgroundColor="red">Delete</Button>
                </Flex>
            }
            <Box sx={{variant: "box.blog" }}>
                <Flex sx={{alignItems: "center", justifyContent: "space-between"}}> 
                    <Heading>{title}</Heading> 
                    <Flex sx={{gap: 12}}>
                        {authorId !== undefined && authorId == userId && <Badge variant="accent">Own</Badge> }
                        {newArticle && <Badge variant="accent">New</Badge> }
                    </Flex>
                </Flex>
                <Paragraph sx={{padding: "6px"}}> {body}</Paragraph>
                <Flex sx={{justifyContent: "flex-end"}}><Text sx={{fontStyle: "italic"}}>{toLocaleTime(addTime)} </Text></Flex>
                <Flex sx={{justifyContent: "space-between"}}>
                    <Text sx={{fontSize: "1.1em"}} color={isAuth ? "primary" : "text"}> <FontAwesomeIcon icon={thumbIconDefinition} color="primary" onClick={() => submitLikeBlog(id)}/> {likes || 0} </Text> 
                    <Text sx={{fontStyle: "italic"}}> by <b>{authorName} </b></Text>
                </Flex>
            </Box>
        </>
    )
}

export default BlogComponent;