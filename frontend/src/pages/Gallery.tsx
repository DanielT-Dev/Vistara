import { useState, useEffect, useMemo } from "react";
import {
    Box,
    Container,
    Heading,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    Grid,
    VStack,
    Image,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useGalleryData } from "../hooks/useGalleryData";

const MotionBox = motion.create(Box);

// debounce
function useDebounce(value: string, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

// highlight
function highlightText(text: string, query: string) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");

    return text.split(regex).map((part, i) =>
        regex.test(part) ? (
            <Box as="span" bg="yellow.200" key={i}>
                {part}
            </Box>
        ) : (
            part
        )
    );
}

export default function Gallery() {
    const navigate = useNavigate();

    const [activeFilter, setActiveFilter] = useState("all");
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 350);

    const stableSearch = useMemo(() => debouncedSearch, [debouncedSearch]);

    const { paintings, categories, loading, error } =
        useGalleryData(activeFilter, stableSearch);

    const filters = useMemo(
        () => [
            { name: "All", slug: "all" },
            ...categories.map((c) => ({
                name: c.name,
                slug: c.slug,
            })),
        ],
        [categories]
    );

    const filteredPaintings = useMemo(() => {
        if (!stableSearch) return paintings;

        const q = stableSearch.toLowerCase().trim();

        return paintings.filter((p) => {
            return (
                p.title?.toLowerCase().includes(q) ||
                p.artist?.toLowerCase().includes(q)
            );
        });
    }, [paintings, stableSearch]);

    if (loading) {
        return (
            <>
                <Navbar />
                <Box pt="120px" textAlign="center">
                    Loading gallery...
                </Box>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <Box pt="120px" textAlign="center" color="red.500">
                    {error}
                </Box>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <Box bg="#fafafa" minH="100vh" pt={{ base: "90px", md: "120px" }} pb={20}>
                <Container maxW="1400px" px={{ base: 4, md: 8 }}>

                    {/* HEADER */}
                    <VStack spacing={4} mb={{ base: 6, md: 10 }}>
                        <Heading fontSize={{ base: "2xl", md: "5xl" }}>
                            Gallery
                        </Heading>

                        <Text
                            color="gray.600"
                            textAlign="center"
                            maxW="600px"
                            fontSize={{ base: "sm", md: "md" }}
                        >
                            Explore timeless masterpieces from artists around the world.
                        </Text>

                        {/* SEARCH */}
                        <InputGroup
                            maxW="650px"
                            w="100%"
                        >
                            <InputLeftElement pointerEvents="none">
                                <SearchIcon color="gray.500" />
                            </InputLeftElement>

                            <Input
                                placeholder="Search paintings..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                bg="whiteAlpha.800"
                                backdropFilter="blur(18px)"
                                border="1px solid"
                                borderColor="blackAlpha.100"
                                borderRadius="full"
                                fontSize={{ base: "sm", md: "md" }}
                                _focus={{
                                    borderColor: "blackAlpha.300",
                                    boxShadow:
                                        "0 0 0 1px rgba(0,0,0,0.1)",
                                }}
                            />
                        </InputGroup>
                    </VStack>

                    {/* FILTERS */}
                    <Box mb={10} display="flex" justifyContent="center">
                        <Box
                            px={{ base: 3, md: 6 }}
                            py={{ base: 2, md: 4 }}
                            borderRadius="full"
                            bg="rgba(255,255,255,0.6)"
                            backdropFilter="blur(18px)"
                            border="1px solid rgba(0,0,0,0.06)"
                            boxShadow="0 10px 30px rgba(0,0,0,0.05)"
                            display="flex"
                            gap={2}
                            flexWrap="wrap"
                            justifyContent="center"
                            maxW="100%"
                        >
                            {filters.map((filter) => {
                                const isActive =
                                    activeFilter === filter.slug;

                                return (
                                    <Box
                                        key={filter.slug}
                                        px={{ base: 3, md: 5 }}
                                        py={{ base: 1, md: 2 }}
                                        fontSize={{ base: "xs", md: "sm" }}
                                        borderRadius="full"
                                        cursor="pointer"
                                        transition="all 0.25s ease"
                                        bg={isActive ? "black" : "transparent"}
                                        color={isActive ? "white" : "black"}
                                        _hover={{
                                            transform: "translateY(-1px)",
                                            bg: isActive
                                                ? "black"
                                                : "gray.100",
                                        }}
                                        onClick={() =>
                                            setActiveFilter(filter.slug)
                                        }
                                    >
                                        {filter.name}
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            columnCount: {
                                base: 1,
                                sm: 2,
                                md: 3,
                                lg: 4,
                            },
                            columnGap: {
                                base: "16px",
                                md: "32px",
                            },
                        }}
                    >
                        {filteredPaintings.map((painting, index) => (
                            <MotionBox
                                key={painting._id}
                                mb={{ base: 4, md: 8 }}
                                sx={{
                                    breakInside: "avoid",
                                }}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.02,
                                }}
                            >
                                <Box
                                    role="group"
                                    cursor="pointer"
                                    onClick={() =>
                                        navigate(`/painting/${painting._id}`)
                                    }
                                    borderRadius="2xl"
                                    overflow="hidden"
                                    bg="white"
                                    boxShadow="lg"
                                    transition="all 0.35s ease"
                                    _hover={{
                                        transform: "translateY(-8px)",
                                        boxShadow: "2xl",
                                    }}
                                >
                                    {/* IMAGE */}
                                    <Box position="relative" overflow="hidden">
                                        <Box
                                            position="relative"
                                            overflow="hidden"
                                        >
                                            <Image
                                                src={painting.imageUrls?.[0]}
                                                fallbackSrc="https://via.placeholder.com/400"
                                                w="100%"
                                                h="auto"
                                                objectFit="cover"
                                                transition="all 0.6s ease"
                                                _groupHover={{
                                                    transform: "scale(1.09)",
                                                    filter: "brightness(0.75)",
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            position="absolute"
                                            bottom={0}
                                            left={0}
                                            right={0}
                                            opacity={0}
                                            transition="all 0.35s ease"
                                            _groupHover={{ opacity: 1 }}
                                            bg="linear-gradient(to top, rgba(0,0,0,0.78), transparent)"
                                            height="45%"
                                            display="flex"
                                            alignItems="flex-end"
                                            justifyContent="center"
                                            pb={6}
                                        >
                                            <Text
                                                color="white"
                                                fontWeight="500"
                                                fontSize={{ base: "sm", md: "md" }}
                                            >
                                                View Painting →
                                            </Text>
                                        </Box>
                                    </Box>

                                    {/* INFO */}
                                    <Box p={{ base: 3, md: 4 }}>
                                        <Text
                                            fontWeight="600"
                                            fontSize={{ base: "sm", md: "md" }}
                                        >
                                            {highlightText(
                                                painting.title,
                                                stableSearch
                                            )}
                                        </Text>

                                        <Text
                                            fontSize={{ base: "12px", md: "13px" }}
                                            color="gray.500"
                                        >
                                            {highlightText(
                                                painting.artist,
                                                stableSearch
                                            )}
                                        </Text>
                                    </Box>
                                </Box>
                            </MotionBox>
                        ))}
                    </Box>

                    {/* GRID
                    <Grid
                        templateColumns={{
                            base: "1fr",
                            sm: "repeat(2,1fr)",
                            md: "repeat(3,1fr)",
                            lg: "repeat(4,1fr)",
                        }}
                        gap={{ base: 4, md: 8 }}
                    >
                        {filteredPaintings.map((painting, index) => (
                            <MotionBox
                                key={painting._id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                    delay: index * 0.02,
                                }}
                            >
                                
                            </MotionBox>
                        ))}
                    </Grid> */}
                </Container>
            </Box>
        </>
    );
}