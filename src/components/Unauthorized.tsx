import { Flex, Heading, NavLink } from "theme-ui";

const Unauthorized = () => (
    <Flex sx={{ flexDirection: "column", alignContent: "center", position: "absolute", inset: "50%", transform: "translate(-50%, -50%)", minWidth: "fit-content", minHeight: "fit-content"}}>
        <Heading> Unauthorized access ! </Heading>
        <NavLink href="/" sx={{textAlign: "center"}} color="primary"> Return </NavLink>
    </Flex>
)

export default Unauthorized;