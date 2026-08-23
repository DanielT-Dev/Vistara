import { Box } from "@chakra-ui/react";

export default function BackgroundShapes() {
    return (
        <>
            <Box
                position="absolute"
                top="-120px"
                left="-120px"
                w="420px"
                h="420px"
                bg="blue.500"
                opacity={0.35}
                borderRadius="50%"
                filter="blur(100px)"
                style={{ animation: "float1 18s ease-in-out infinite" }}
            />

            <Box
                position="absolute"
                top="40%"
                right="-180px"
                w="500px"
                h="500px"
                bg="purple.500"
                opacity={0.25}
                borderRadius="50%"
                filter="blur(120px)"
                style={{ animation: "float2 22s ease-in-out infinite" }}
            />

            <Box
                position="absolute"
                bottom="-120px"
                left="25%"
                w="350px"
                h="350px"
                bg="orange.400"
                opacity={0.3}
                borderRadius="50%"
                filter="blur(90px)"
                style={{ animation: "float3 16s ease-in-out infinite" }}
            />
        </>
    );
}