import { IconLookup, IconDefinition, findIconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Box, Paragraph } from "theme-ui"

const thumbIcon: IconLookup = { prefix: "fas", iconName: "thumbs-up" }
const thumbIconDefinition: IconDefinition = findIconDefinition(thumbIcon);

const SkeletonBlogs = () => {
    return (
        <>
        {new Array(3).fill(1).map(arr => (
            <Box sx={{ variant: "box.blog" }}>
                <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{variant: "box.skeleton", width: "65%", height: "1.5rem"}} />
                </Flex>
                <Paragraph sx={{ padding: "6px", wordBreak: "break-word", whiteSpace: "pre-wrap"}}> </Paragraph>
                <Flex sx={{ justifyContent: "flex-end", flexDirection: "column" }}>
                    <Box sx={{variant: "box.skeleton"}} />
                    <Box sx={{variant: "box.skeleton"}} />
                    <Box sx={{variant: "box.skeleton", width: "75%"}} />
                </Flex>
                <Flex sx={{ justifyContent: "space-between"}}>
                <Box sx={{variant: "box.textSkeletonAnimation"}}><FontAwesomeIcon icon={thumbIconDefinition} color="primary" /></Box>
                </Flex>
            </Box>
        ))}
        </>
    )
}

export default SkeletonBlogs;