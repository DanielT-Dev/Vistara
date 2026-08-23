import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const buttonBase = {
    transition: "all 0.25s ease",
    _hover: {
        transform: "translateY(-2px)",
        boxShadow: "lg",
    },
    _active: {
        transform: "translateY(0px) scale(0.98)",
    },
};

export default function Hero() {
    const navigate = useNavigate();

    return (
        <Box
            position="relative"
            zIndex={2}
            pt="150px"
            pb="90px"
            minH="70vh"
            textAlign="center"
        >
            <Box
                position="absolute"
                top="20%"
                left="50%"
                transform="translateX(-50%)"
                w="500px"
                h="300px"
                bg="radial-gradient(circle, rgba(99,179,237,0.25), transparent 70%)"
                filter="blur(40px)"
                zIndex={0}
            />

            <VStack spacing={6} position="relative" zIndex={1}>
                <Text
                    fontSize={{ base: "36px", md: "56px" }}
                    fontWeight="600"
                    lineHeight="1.1"
                >
                    Paintings that tell stories
                </Text>

                <Text opacity={0.6} maxW="600px">
                    Discover meaning, history, and emotion hidden inside masterpieces from around the world.
                </Text>

                <HStack spacing={4} pt={4}>
                    <Button
                        bg="black"
                        color="white"
                        rightIcon={<FiArrowRight />}
                        onClick={() => navigate("/gallery")}
                        {...buttonBase}
                        _hover={{
                            ...buttonBase._hover,
                            bg: "gray.800",
                        }}
                    >
                        Explore Gallery
                    </Button>

                    <Button
                        variant="ghost"
                        {...buttonBase}
                    >
                        Learn more
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
}