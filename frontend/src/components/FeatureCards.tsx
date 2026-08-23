import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FiBookOpen, FiSearch, FiImage } from "react-icons/fi";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const features = [
    {
        icon: FiImage,
        title: "Curated Paintings",
        desc: "Hand-picked artworks from different eras and styles.",
    },
    {
        icon: FiBookOpen,
        title: "Art Stories",
        desc: "Discover the history and meaning behind each piece.",
    },
    {
        icon: FiSearch,
        title: "Deep Exploration",
        desc: "Explore symbolism, technique, and artistic intent.",
    },
];

export default function FeatureCards() {
    return (
        <Box px={6} py={28}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} maxW="1100px" mx="auto">

                {features.map((f, i) => (
                    <MotionBox
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                    >
                        <Box
                            p={8}
                            borderRadius="20px"
                            bg="rgba(255,255,255,0.6)"
                            backdropFilter="blur(16px)"
                            border="1px solid rgba(0,0,0,0.06)"
                            boxShadow="md"
                            transition="all 0.35s ease"
                            _hover={{
                                transform: "translateY(-10px) scale(1.02)",
                                boxShadow: "2xl",
                                bg: "rgba(255,255,255,0.75)",
                            }}
                        >
                            <VStack spacing={4} align="start">
                                <Box fontSize="26px">
                                    <f.icon />
                                </Box>

                                <Text fontWeight="600" fontSize="18px">
                                    {f.title}
                                </Text>

                                <Text fontSize="14px" opacity={0.6}>
                                    {f.desc}
                                </Text>
                            </VStack>
                        </Box>
                    </MotionBox>
                ))}

            </SimpleGrid>
        </Box>
    );
}