import {
    Box,
    Container,
    Heading,
    Text,
    Image,
    VStack,
    HStack,
    Grid,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getPaintingById } from "../api/paintingApi";

const MotionBox = motion.create(Box);

export default function PaintingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [painting, setPainting] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (!id) return;

            const data = await getPaintingById(id);
            // console.log("PAINTING DETAILS:", data);
            // console.log("RELATED PAINTINGS:", data.relatedPaintings);

            setPainting(data);
            setLoading(false);
        }

        load();
    }, [id]);

    if (loading) {
        return (
            <Box pt="120px" textAlign="center">
                Loading...
            </Box>
        );
    }

    if (!painting) {
        return (
            <Box pt="120px" textAlign="center">
                Painting not found
            </Box>
        );
    }

    return (
        <Box bg="#fafafa" minH="100vh" pt="100px" pb={20}>
            <Container maxW="1100px">

                {/* BACK */}
                <Text
                    mb={6}
                    cursor="pointer"
                    onClick={() => navigate(-1)}
                    opacity={0.6}
                    _hover={{ opacity: 1 }}
                >
                    ← Back to Gallery
                </Text>

                {/* IMAGE */}
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box
                        w="100%"
                        h={{ base: "300px", md: "500px" }}
                        bg="gray.100"
                        borderRadius="2xl"
                        overflow="hidden"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        boxShadow="xl"
                    >
                        <Image
                            src={painting.imageUrls?.[0]}
                            w="100%"
                            h="100%"
                            objectFit="contain"
                            objectPosition="center"
                        />
                    </Box>
                </MotionBox>

                {/* INFO */}
                <VStack align="start" mt={10} spacing={4}>
                    <Heading fontSize={{ base: "2xl", md: "4xl" }}>
                        {painting.title}
                    </Heading>

                    <HStack spacing={6} color="gray.600">
                        <Text>{painting.artist}</Text>
                        <Text>•</Text>
                        <Text>{painting.year}</Text>
                        <Text>•</Text>
                        <Text>{painting.medium}</Text>
                    </HStack>

                    <Text color="gray.700" maxW="700px" lineHeight="1.8">
                        {painting.description}
                    </Text>
                </VStack>

                <Box mt={16}>
                    <Heading fontSize="xl" mb={6}>
                        Related Works
                    </Heading>

                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                        {painting.relatedPaintings?.length ? (
                            painting.relatedPaintings
                                .sort((a: any, b: any) => b.score - a.score) // highest score first
                                .slice(0, 6) // optional safety limit
                                .map((p: any, i: number) => (
                                    <Box
                                        key={p._id || i}
                                        cursor="pointer"
                                        onClick={() => navigate(`/painting/${p._id}`)}
                                        _hover={{ transform: "scale(1.02)" }}
                                        transition="0.2s ease"
                                    >
                                        <Image
                                            src={p.imageUrls?.[0]}
                                            h="180px"
                                            w="100%"
                                            objectFit="cover"
                                            borderRadius="xl"
                                            fallbackSrc="https://via.placeholder.com/400x300?text=No+Image"
                                        />

                                        <Text mt={2} fontWeight="500">
                                            {p.title}
                                        </Text>

                                        {/* <Text fontSize="sm" color="gray.500">
                                            Score: {p.score}
                                        </Text> */}
                                    </Box>
                                ))
                        ) : (
                            <Text color="gray.500">
                                No related paintings yet
                            </Text>
                        )}
                    </Grid>
                </Box>

            </Container>
        </Box>
    );
}