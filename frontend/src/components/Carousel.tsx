import { Box, Image, HStack } from "@chakra-ui/react";

const images = [
    "/paintings/painting1.jpg",
    "/paintings/painting2.jpg",
    "/paintings/painting3.jpg",
    "/paintings/painting4.jpg",
    "/paintings/painting5.jpg",
    "/paintings/painting6.jpg",
    "/paintings/painting7.jpg",
    "/paintings/painting8.jpg",
];

export default function Carousel() {
    return (
        <Box mt="120px" position="relative" overflow="hidden">

            {/* fades */}
            <Box
                position="absolute"
                left={0}
                top={0}
                w="140px"
                h="100%"
                bg="linear-gradient(to right, #f7fafc, transparent)"
                zIndex={5}
                pointerEvents="none"
            />
            <Box
                position="absolute"
                right={0}
                top={0}
                w="140px"
                h="100%"
                bg="linear-gradient(to left, #f7fafc, transparent)"
                zIndex={5}
                pointerEvents="none"
            />

            <HStack
                spacing={20}
                w="max-content"
                animation="carouselScroll 55s linear infinite"
                align="center"
            >
                {[...images, ...images].map((src, i) => (
                    <Box
                        key={i}
                        flex="0 0 auto"
                        cursor="pointer"
                        transition="all 0.35s ease"
                        transform="scale(0.9) rotate(2deg)"
                        opacity={0.55}
                        _hover={{
                            transform: "scale(1.08) rotate(0deg)",
                            opacity: 1,
                            boxShadow: "2xl",
                            zIndex: 2,
                        }}
                    >
                        <Image
                            src={src}
                            w={{ base: "240px", md: "320px" }}
                            h={{ base: "340px", md: "420px" }}
                            objectFit="cover"
                            borderRadius="14px"
                            boxShadow="xl"
                        />
                    </Box>
                ))}
            </HStack>
        </Box>
    );
}