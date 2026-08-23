import {
    Box,
    Flex,
    Text,
    HStack,
    Button,
    IconButton,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";

import {
    FiLogIn,
    FiUserPlus,
    FiMenu,
    FiLogOut,
} from "react-icons/fi";

import {
    useNavigate,
} from "react-router-dom";

import { useAppSelector } from "../hooks/useAppDispatch";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout } from "../store/authSlice";


export default function Navbar() {

    const navigate = useNavigate();

    const {
        isOpen,
        onOpen,
        onClose,
    } = useDisclosure();


    const isLoggedIn = useAppSelector(
        (state) => state.auth.isAuthenticated
    );

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const navItems = [
        {
            label: "Gallery",
            path: "/gallery",
        },
        {
            label: "Paintings Graph",
            path: "/graph",
        },
        {
            label: "Explore",
            path: "/explore",
        },
    ];



    return (
        <>

            <Box
                position="fixed"
                top="0"
                left="0"
                w="100%"
                zIndex="1000"
                backdropFilter="blur(16px)"
                bg="rgba(255,255,255,0.65)"
                borderBottom="1px solid rgba(0,0,0,0.06)"
            >

                <Flex
                    maxW="1200px"
                    mx="auto"
                    px={6}
                    py={4}
                    align="center"
                    justify="space-between"
                >


                    {/* Logo */}

                    <Text
                        fontWeight="600"
                        fontSize="18px"
                        cursor="pointer"
                        transition="all 0.2s ease"
                        onClick={() => navigate("/")}
                        _hover={{
                            opacity: 0.8,
                        }}
                    >
                        Vistara
                    </Text>



                    <Flex
                        align="center"
                        gap={3}
                    >



                        {/* Desktop navigation */}

                        <HStack
                            spacing={8}
                            display={{
                                base: "none",
                                md: "flex",
                            }}
                        >

                            {navItems.map((item) => (

                                <Text
                                    key={item.label}
                                    fontSize="14px"
                                    opacity={0.7}
                                    cursor="pointer"
                                    transition="all 0.2s ease"
                                    onClick={() =>
                                        navigate(item.path)
                                    }
                                    _hover={{
                                        opacity: 1,
                                        transform:
                                            "translateY(-1px)",
                                    }}
                                >
                                    {item.label}
                                </Text>

                            ))}

                        </HStack>





                        {/* Desktop auth */}

                        <HStack
                            spacing={3}
                            display={{
                                base: "none",
                                md: "flex",
                            }}
                        >

                            {!isLoggedIn ? (

                                <>

                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        leftIcon={
                                            <FiLogIn />
                                        }
                                        onClick={() =>
                                            navigate("/login")
                                        }
                                        _hover={{
                                            transform:
                                                "translateY(-2px)",
                                        }}
                                    >
                                        Login
                                    </Button>


                                    <Button
                                        size="sm"
                                        bg="black"
                                        color="white"
                                        leftIcon={
                                            <FiUserPlus />
                                        }
                                        onClick={() =>
                                            navigate("/signup")
                                        }
                                        _hover={{
                                            bg: "gray.800",
                                            transform:
                                                "translateY(-2px)",
                                        }}
                                    >
                                        Sign up
                                    </Button>

                                </>

                            ) : (

                                <Button
                                    size="sm"
                                    variant="ghost"
                                    leftIcon={
                                        <FiLogOut />
                                    }
                                    onClick={handleLogout}
                                    _hover={{
                                        transform:
                                            "translateY(-2px)",
                                    }}
                                >
                                    Logout
                                </Button>

                            )}

                        </HStack>





                        {/* Mobile menu */}

                        <IconButton
                            display={{
                                base: "flex",
                                md: "none",
                            }}
                            aria-label="Open menu"
                            icon={<FiMenu />}
                            variant="ghost"
                            onClick={onOpen}
                        />

                    </Flex>

                </Flex>

            </Box>





            {/* Mobile drawer */}

            <Drawer
                placement="right"
                onClose={onClose}
                isOpen={isOpen}
            >

                <DrawerOverlay />

                <DrawerContent>

                    <DrawerHeader
                        borderBottomWidth="1px"
                    >
                        Vistara
                    </DrawerHeader>


                    <DrawerBody>

                        <VStack
                            align="stretch"
                            spacing={5}
                            mt={6}
                        >

                            {navItems.map((item) => (

                                <Button
                                    key={item.label}
                                    variant="ghost"
                                    justifyContent="flex-start"
                                    onClick={() => {
                                        navigate(item.path);
                                        onClose();
                                    }}
                                >
                                    {item.label}
                                </Button>

                            ))}



                            {!isLoggedIn ? (

                                <>

                                    <Button
                                        leftIcon={
                                            <FiLogIn />
                                        }
                                        variant="outline"
                                        onClick={() => {
                                            navigate("/login");
                                            onClose();
                                        }}
                                    >
                                        Login
                                    </Button>


                                    <Button
                                        bg="black"
                                        color="white"
                                        leftIcon={
                                            <FiUserPlus />
                                        }
                                        _hover={{
                                            bg: "gray.800",
                                        }}
                                        onClick={() => {
                                            navigate("/signup");
                                            onClose();
                                        }}
                                    >
                                        Sign up
                                    </Button>

                                </>

                            ) : (

                                <Button
                                    leftIcon={
                                        <FiLogOut />
                                    }
                                    variant="outline"
                                    onClick={() => {
                                        handleLogout();
                                        onClose();
                                    }}
                                >
                                    Logout
                                </Button>

                            )}

                        </VStack>

                    </DrawerBody>

                </DrawerContent>

            </Drawer>

        </>
    );
}