import { Button, Flex, Heading, NavLink } from "theme-ui"
import { useAuth } from "../auth/AuthProvider";

const NavBar = () => {
    const { isAuth, name, onLogout } = useAuth();

    return (
        <Flex sx={{boxShadow: "0 0 3px black", backgroundColor: "highlight", flexDirection: "row", justifyContent: "space-between", height: "5rem", alignItems: "center", padding: "18px"}}>
            <Flex as="nav">
                <NavLink href="/">
                    Home
                </NavLink>
                {isAuth &&
                    <>
                        <NavLink href="/blogs/">
                            My blogs
                        </NavLink>
                        <NavLink href="/blogs/create">
                            Create Blog
                        </NavLink>
                    </>
                }
            </Flex>
            <Flex sx={{gap: "20px"}}>
            {!isAuth &&
                <>
                    <NavLink href="/register/">
                        <Button variant="link">Register</Button>
                    </NavLink>
                    <NavLink href="/login/">
                        <Button variant="link" sx={{backgroundColor: "coral"}}>Login</Button>
                    </NavLink>
                </>
            }
            {isAuth &&
                <Flex sx={{alignItems: "center"}}>
                    <Heading sx={{marginRight: "12px", minWidth: "initial"}}> { name } </Heading>
                    <Button sx={{backgroundColor: "coral"}} variant="link" onClick={() => onLogout()}>Logout</Button>
                </Flex>
            }
            </Flex>
        </Flex>
    )
}

export default NavBar;