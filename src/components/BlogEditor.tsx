import { DocumentNode, useMutation } from "@apollo/react-hooks";
import Router from "next/router";
import { useState } from "react";
import { Box, Spinner, Flex, Input, Button, Paragraph, Textarea } from "theme-ui";
import { useAuth } from "../auth/AuthProvider";
import Unauthorized from "./Unauthorized";

interface IBlogEditorProps {
    id?: number
    body?: string
    title?: string
    mutation: DocumentNode
}

const BlogEditor = (props: IBlogEditorProps) => {
    const [title, setTitle] = useState(props.title || "");
    const [body, setBody] = useState(props.body || "");
    const [responseMessage, setResponseMessage] = useState("")
    const [loading, setLoading] = useState(false);

    const {isAuth} = useAuth();
    const [updateBlogs] = useMutation(props.mutation);

    if (!isAuth)
        return Unauthorized()

    const submitData = async () => {
        /** Check empty fields */
        if (!title.length || !body.length) {
            setResponseMessage("All fields must be completed!");
            return;
        }

        if (title.length > 40) {
            setResponseMessage("Title length is limited to 40");
            return;
        }

        setLoading(true);
        const response = await updateBlogs({
            variables: {
                title,
                body,
                id: props.id || undefined
            }, errorPolicy: "all"
        });

        if (response.errors) {
            setResponseMessage(response.errors[0].message);
            setLoading(false);
            return;
        }

        setLoading(false);
        Router.push("/blogs");
    }

    if (loading) {
        return (
            <Box as="form" sx={{ width: "40%", margin: "auto", marginTop: "10%", border: "1px solid black", borderRadius: "8px", textAlign: 'center' }} padding="64px" bg="highlight" onSubmit={(e) => e.preventDefault()}>
                <Spinner />
            </Box>
        )
    }

    return (
        <Flex as="form" sx={{ flexDirection: "column", justifyContent: "center", textAlign: "center", width: "70%", margin: "auto", marginTop: "5%", border: "1px solid black", borderRadius: "8px" }} padding="18px" bg="highlight" onSubmit={(e) => e.preventDefault()}>
            <Input
                placeholder="Title"
                name="title"
                mb={3}
                maxLength={40}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
                placeholder="Body"
                sx={{minHeight: 400}}
                name="body"
                mb={3}
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <Button variant="link" onClick={submitData}>Submit</Button>
            <Paragraph color="red"> {responseMessage} </Paragraph>
        </Flex>
    )
}

export default BlogEditor;