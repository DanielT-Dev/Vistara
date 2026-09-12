import { useEffect, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

import { getGraph } from "../api/graphApi";

import {
  Box,
  Text,
  VStack,
  HStack,
  IconButton,
  useBreakpointValue,
  Switch,
  Divider,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiSun,
  FiMoon,
  FiExternalLink,
} from "react-icons/fi";

type GraphNode = {
  id: string;
  title: string;
  artist: string;
  tags?: string[];
  x?: number;
  y?: number;
};

type GraphLink = {
  source: any;
  target: any;
  weight?: number;
};

type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

const artistColors = new Map<string, string>();

const palette = [
  "#ff6b6b",
  "#4dabf7",
  "#51cf66",
  "#ffd43b",
  "#845ef7",
  "#ff922b",
  "#20c997",
];

let colorIndex = 0;

function getArtistColor(artist: string) {
  if (!artistColors.has(artist)) {
    artistColors.set(
      artist,
      palette[colorIndex % palette.length]
    );

    colorIndex++;
  }

  return artistColors.get(artist)!;
}

const movements = [
  "renaissance",
  "baroque",
  "romanticism",
  "neoclassicism",
  "symbolism",
  "realism",
  "gothic",
];

function getMovement(tags: string[] = []) {
  return (
    tags.find((tag) =>
      movements.includes(tag.toLowerCase())
    ) || "Unknown"
  );
}

function getNodeId(node: any): string {
  return typeof node === "object" ? node.id : node;
}

function getWeight(link: GraphLink) {
  return link.weight || 0;
}

function getRelatedNode(
  link: GraphLink,
  nodeId: string
) {
  const sourceId = getNodeId(link.source);
  const targetId = getNodeId(link.target);

  if (sourceId === nodeId) {
    return targetId;
  }

  if (targetId === nodeId) {
    return sourceId;
  }

  return null;
}

export default function GraphView() {
  const [graph, setGraph] =
    useState<GraphData | null>(null);

  const [focusNode, setFocusNode] =
    useState<GraphNode | null>(null);

  const [hoverNode, setHoverNode] =
    useState<GraphNode | null>(null);

  const [darkMode, setDarkMode] =
    useState(true);

  const fgRef = useRef<any>(null);

  const navigate = useNavigate();

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const isSmallScreen = useBreakpointValue({
    base: true,
    sm: false,
    lg: false,
  });

  const panelWidth = isMobile
    ? 0
    : isSmallScreen
      ? 320
      : 390;

  useEffect(() => {
    getGraph()
      .then(setGraph)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!graph || !fgRef.current) return;

    const timeout = setTimeout(() => {
      fgRef.current.zoomToFit(
        700,
        isMobile ? 35 : 70
      );
    }, 600);

    return () => clearTimeout(timeout);
  }, [graph, isMobile]);

  useEffect(() => {
    if (!fgRef.current || !graph) return;

    const charge =
      fgRef.current.d3Force("charge");

    if (charge) {
      charge.strength(
        isMobile ? -90 : -190
      );
    }

    const link =
      fgRef.current.d3Force("link");

    if (link) {
      link.distance((edge: GraphLink) => {
        const weight = getWeight(edge);

        /*
         * Stronger similarity = shorter distance.
         */
        const baseDistance = isMobile
          ? 105
          : 135;

        const compression = Math.min(
          weight * 7,
          85
        );

        return Math.max(
          45,
          baseDistance - compression
        );
      });
    }
  }, [graph, isMobile]);

  const isNeighbor = (node: GraphNode) => {
    if (!focusNode || !graph) {
      return true;
    }

    return graph.links.some((link) => {
      const sourceId = getNodeId(link.source);
      const targetId = getNodeId(link.target);

      return (
        (sourceId === focusNode.id &&
          targetId === node.id) ||
        (targetId === focusNode.id &&
          sourceId === node.id)
      );
    });
  };

  const getNodeConnections = (
    node: GraphNode
  ) => {
    if (!graph) return [];

    return graph.links
      .filter((link) => {
        const sourceId = getNodeId(link.source);
        const targetId = getNodeId(link.target);

        return (
          sourceId === node.id ||
          targetId === node.id
        );
      })
      .map((link) => {
        const relatedId = getRelatedNode(
          link,
          node.id
        );

        const relatedPainting =
          graph.nodes.find(
            (candidate) =>
              candidate.id === relatedId
          );

        if (!relatedPainting) {
          return null;
        }

        return {
          painting: relatedPainting,
          score: getWeight(link),
        };
      })
      .filter(
        (
          item
        ): item is {
          painting: GraphNode;
          score: number;
        } => item !== null
      )
      .sort((a, b) => b.score - a.score);
  };

  const selectedConnections = focusNode
    ? getNodeConnections(focusNode)
    : [];

  const strongestRelationship =
    selectedConnections[0] || null;

  if (!graph) {
    return (
      <Box
        w="100vw"
        h="100vh"
        bg="black"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text opacity={0.7}>
          Loading painting graph...
        </Text>
      </Box>
    );
  }

  const background = darkMode
    ? "#050505"
    : "#fafafa";

  const panelBackground = darkMode
    ? "rgba(12, 12, 12, 0.96)"
    : "rgba(255, 255, 255, 0.96)";

  const textColor = darkMode
    ? "white"
    : "black";

  const secondaryColor = darkMode
    ? "rgba(255,255,255,0.58)"
    : "rgba(0,0,0,0.55)";

  const borderColor = darkMode
    ? "rgba(255,255,255,0.10)"
    : "rgba(0,0,0,0.10)";

  return (
    <Box
      w="100vw"
      h="100vh"
      bg={background}
      color={textColor}
      position="relative"
      overflow="hidden"
    >
      {/* =========================
          GRAPH AREA
         ========================= */}

      <Box
        position="absolute"
        top="0"
        left="0"
        bottom="0"
        right={
          isMobile
            ? "0"
            : `${panelWidth}px`
        }
      >
        {/* TOP NAVIGATION */}

        <Box
          position="absolute"
          top="18px"
          left="20px"
          zIndex={20}
          px={3}
          py={2}
          borderRadius="14px"
          bg={
            darkMode
              ? "rgba(10,10,10,0.78)"
              : "rgba(255,255,255,0.86)"
          }
          backdropFilter="blur(16px)"
          border={`1px solid ${borderColor}`}
          boxShadow="0 8px 30px rgba(0,0,0,0.15)"
        >
          <HStack spacing={3}>
            <IconButton
              size="sm"
              aria-label="Go back"
              icon={<FiArrowLeft />}
              onClick={() =>
                navigate(-1)
              }
              variant="ghost"
              color={textColor}
              _hover={{
                bg: darkMode
                  ? "whiteAlpha.200"
                  : "blackAlpha.100",
              }}
            />

            <Divider
              orientation="vertical"
              h="20px"
              borderColor={borderColor}
            />

            <VStack
              align="start"
              spacing={0}
            >
              <Text
                fontWeight="700"
                fontSize="sm"
              >
                Paintings Graph
              </Text>

              <Text
                fontSize="10px"
                color={secondaryColor}
              >
                Similarity network
              </Text>
            </VStack>

            <Divider
              orientation="vertical"
              h="20px"
              borderColor={borderColor}
            />

            <FiSun size={14} />

            <Switch
              size="sm"
              isChecked={darkMode}
              onChange={() =>
                setDarkMode(!darkMode)
              }
            />

            <FiMoon size={14} />
          </HStack>
        </Box>

        {/* GRAPH LEGEND */}

        <Box
          position="absolute"
          bottom="20px"
          left="20px"
          zIndex={10}
          px={3}
          py={2}
          borderRadius="10px"
          bg={
            darkMode
              ? "rgba(10,10,10,0.75)"
              : "rgba(255,255,255,0.85)"
          }
          backdropFilter="blur(12px)"
          border={`1px solid ${borderColor}`}
        >
          <VStack
            align="start"
            spacing={1}
          >
            <Text
              fontSize="10px"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="0.08em"
              color={secondaryColor}
            >
              Graph legend
            </Text>

            <HStack spacing={2}>
              <Box
                w="8px"
                h="8px"
                borderRadius="50%"
                bg="#4dabf7"
              />

              <Text fontSize="11px">
                Painting
              </Text>
            </HStack>

            <HStack spacing={2}>
              <Box
                w="18px"
                h="2px"
                bg={
                  darkMode
                    ? "whiteAlpha.500"
                    : "blackAlpha.400"
                }
              />

              <Text fontSize="11px">
                Similarity connection
              </Text>
            </HStack>

            <Text
              fontSize="10px"
              color={secondaryColor}
              mt={1}
            >
              Higher score = stronger relationship
            </Text>
          </VStack>
        </Box>

        <ForceGraph2D
          ref={fgRef}
          graphData={graph}
          width={
            typeof window !== "undefined"
              ? window.innerWidth -
              panelWidth
              : undefined
          }
          height={
            typeof window !== "undefined"
              ? window.innerHeight
              : undefined
          }
          cooldownTicks={250}
          d3AlphaDecay={0.018}
          d3VelocityDecay={
            isMobile ? 0.22 : 0.16
          }

          /*
           * ==========================
           * EDGES
           * ==========================
           */

          linkColor={(link: GraphLink) => {
            if (!focusNode) {
              return darkMode
                ? "rgba(255,255,255,0.25)"
                : "rgba(0,0,0,0.18)";
            }

            const sourceId =
              getNodeId(link.source);

            const targetId =
              getNodeId(link.target);

            const connected =
              sourceId === focusNode.id ||
              targetId === focusNode.id;

            return connected
              ? darkMode
                ? "rgba(255,255,255,0.70)"
                : "rgba(0,0,0,0.60)"
              : darkMode
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.05)";
          }}

          linkWidth={(link: GraphLink) => {
            const weight =
              getWeight(link);

            const sourceId =
              getNodeId(link.source);

            const targetId =
              getNodeId(link.target);

            const selected =
              focusNode &&
              (sourceId ===
                focusNode.id ||
                targetId ===
                focusNode.id);

            const baseWidth =
              Math.min(
                1 + weight * 0.22,
                5
              );

            return selected
              ? baseWidth + 1.5
              : baseWidth;
          }}

          /*
           * Display the similarity score
           * directly on every edge.
           */
          linkCanvasObjectMode={() =>
            "after"
          }

          linkCanvasObject={(
            link: any,
            ctx: CanvasRenderingContext2D
          ) => {
            if (
              link.source?.x === undefined ||
              link.source?.y === undefined ||
              link.target?.x === undefined ||
              link.target?.y === undefined
            ) {
              return;
            }

            const sourceId =
              getNodeId(link.source);

            const targetId =
              getNodeId(link.target);

            const connected =
              !focusNode ||
              sourceId === focusNode.id ||
              targetId === focusNode.id;

            if (!connected) {
              return;
            }

            const x =
              (link.source.x +
                link.target.x) /
              2;

            const y =
              (link.source.y +
                link.target.y) /
              2;

            const score =
              getWeight(link);

            const label =
              score.toFixed(2);

            /*
             * Small dark/light background behind
             * the score so it remains readable
             * over the graph.
             */
            ctx.save();

            ctx.font =
              "600 10px Inter, Arial, sans-serif";

            const metrics =
              ctx.measureText(label);

            const paddingX = 4;
            const paddingY = 2;

            const width =
              metrics.width +
              paddingX * 2;

            const height = 14;

            ctx.fillStyle = darkMode
              ? "rgba(0,0,0,0.72)"
              : "rgba(255,255,255,0.82)";

            ctx.beginPath();

            ctx.roundRect(
              x - width / 2,
              y - height / 2,
              width,
              height,
              4
            );

            ctx.fill();

            ctx.fillStyle =
              darkMode
                ? "rgba(255,255,255,0.82)"
                : "rgba(0,0,0,0.72)";

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText(
              label,
              x,
              y
            );

            ctx.restore();
          }}

          /*
           * ==========================
           * NODES
           * ==========================
           */

          onNodeClick={(node: any) => {
            setFocusNode(
              node as GraphNode
            );
          }}

          onNodeRightClick={(
            node: any
          ) => {
            setFocusNode(null);
            navigate(
              `/painting/${node.id}`
            );
          }}

          onNodeHover={(node: any) => {
            setHoverNode(
              node as GraphNode | null
            );
          }}

          nodePointerAreaPaint={(node: any, color, ctx) => {
            const isSelected =
              focusNode?.id === node.id;

            const isHovered =
              hoverNode?.id === node.id;

            const size = isSelected
              ? 12
              : isHovered
                ? 11
                : 9;

            ctx.fillStyle = color;

            ctx.beginPath();

            ctx.arc(
              node.x,
              node.y,
              size,
              0,
              Math.PI * 2
            );

            ctx.fill();
          }}

          nodeCanvasObject={(
            node: any,
            ctx,
            globalScale
          ) => {
            const graphNode =
              node as GraphNode;

            const color =
              getArtistColor(
                graphNode.artist
              );

            const neighbor =
              isNeighbor(graphNode);

            const selected =
              focusNode?.id ===
              graphNode.id;

            const hovered =
              hoverNode?.id ===
              graphNode.id;

            /*
             * Selected nodes are large.
             * Connected nodes remain visible.
             * Unrelated nodes fade.
             */
            let size = 4;

            if (selected) {
              size = 8;
            } else if (hovered) {
              size = 7;
            } else if (
              focusNode &&
              neighbor
            ) {
              size = 5;
            }

            const alpha =
              focusNode &&
                !neighbor &&
                !selected
                ? 0.16
                : 1;

            /*
             * Glow
             */
            ctx.beginPath();

            ctx.arc(
              node.x,
              node.y,
              size + 4,
              0,
              Math.PI * 2
            );

            ctx.fillStyle =
              color + "25";

            ctx.globalAlpha =
              alpha;

            ctx.fill();

            /*
             * Main node
             */
            ctx.beginPath();

            ctx.arc(
              node.x,
              node.y,
              size,
              0,
              Math.PI * 2
            );

            ctx.fillStyle = color;

            ctx.globalAlpha =
              alpha;

            ctx.fill();

            /*
             * Selected ring
             */
            if (selected) {
              ctx.beginPath();

              ctx.arc(
                node.x,
                node.y,
                size + 4,
                0,
                Math.PI * 2
              );

              ctx.strokeStyle =
                darkMode
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(0,0,0,0.8)";

              ctx.lineWidth = 1.5;

              ctx.stroke();
            }

            ctx.globalAlpha = 1;

            /*
             * Labels:
             *
             * Don't display every giant title
             * at all times. This was one of the
             * main causes of the visual clutter
             * in the previous version.
             *
             * Always show selected/hovered nodes.
             * Otherwise show labels only when the
             * graph is sufficiently zoomed in.
             */
            const showLabel =
              selected ||
              hovered ||
              globalScale > 1.35;

            if (showLabel) {
              const fontSize = selected
                ? 13
                : Math.max(
                  9,
                  11 / globalScale
                );

              ctx.font = `600 ${fontSize}px Inter, Arial, sans-serif`;

              ctx.fillStyle =
                darkMode
                  ? "#ffffff"
                  : "#111111";

              ctx.globalAlpha =
                alpha;

              ctx.textAlign = "left";
              ctx.textBaseline =
                "middle";

              ctx.fillText(
                graphNode.title,
                node.x + size + 7,
                node.y
              );

              ctx.globalAlpha = 1;
            }
          }}
        />
      </Box>

      {/* =========================
          INFORMATION PANEL
         ========================= */}

      <Box
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        width={
          isMobile
            ? "100%"
            : `${panelWidth}px`
        }
        pointerEvents={
          isMobile ? "none" : "auto"
        }
      >
        <Box
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          width="100%"
          bg={panelBackground}
          borderLeft={
            isMobile
              ? "none"
              : `1px solid ${borderColor}`
          }
          backdropFilter="blur(20px)"
          pointerEvents="auto"
          overflowY="auto"
          boxShadow={
            isMobile
              ? "0 -10px 40px rgba(0,0,0,0.3)"
              : "-10px 0 40px rgba(0,0,0,0.15)"
          }
          p={
            isMobile
              ? 5
              : 7
          }
        >
          {/* PANEL HEADER */}

          <VStack
            align="start"
            spacing={1}
            mb={6}
          >
            <Text
              fontSize="10px"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="0.12em"
              color={secondaryColor}
            >
              Painting relationships
            </Text>

            <Text
              fontSize={
                isMobile
                  ? "2xl"
                  : "3xl"
              }
              fontWeight="700"
              lineHeight="1.1"
            >
              {focusNode
                ? "Explore connections"
                : "Similarity graph"}
            </Text>

            <Text
              fontSize="sm"
              color={secondaryColor}
              lineHeight="1.5"
            >
              {focusNode
                ? "Explore the paintings most closely related to the selected work."
                : "Select a painting to explore how it relates to the rest of the collection."}
            </Text>
          </VStack>

          {!focusNode ? (
            <>
              {/* EMPTY STATE */}

              <Box
                border={`1px solid ${borderColor}`}
                borderRadius="16px"
                p={5}
                mb={5}
              >
                <VStack
                  align="start"
                  spacing={3}
                >
                  <Text
                    fontSize="lg"
                    fontWeight="600"
                  >
                    How it works
                  </Text>

                  <Text
                    fontSize="sm"
                    color={secondaryColor}
                    lineHeight="1.6"
                  >
                    Each connection represents
                    a similarity relationship
                    between two paintings.
                  </Text>

                  <Text
                    fontSize="sm"
                    color={secondaryColor}
                    lineHeight="1.6"
                  >
                    Scores are calculated using
                    TF-IDF cosine similarity,
                    combined with artist and art
                    movement information.
                  </Text>

                  <Divider
                    borderColor={borderColor}
                  />

                  <HStack
                    justify="space-between"
                    w="100%"
                  >
                    <Text
                      fontSize="xs"
                      color={secondaryColor}
                    >
                      Paintings
                    </Text>

                    <Text
                      fontSize="sm"
                      fontWeight="700"
                    >
                      {graph.nodes.length}
                    </Text>
                  </HStack>

                  <HStack
                    justify="space-between"
                    w="100%"
                  >
                    <Text
                      fontSize="xs"
                      color={secondaryColor}
                    >
                      Relationships
                    </Text>

                    <Text
                      fontSize="sm"
                      fontWeight="700"
                    >
                      {graph.links.length}
                    </Text>
                  </HStack>
                </VStack>
              </Box>

              <Text
                fontSize="xs"
                color={secondaryColor}
              >
                Click a node to inspect its
                relationships. Right-click a node
                to open the painting.
              </Text>
            </>
          ) : (
            <>
              {/* SELECTED PAINTING */}

              <Box
                border={`1px solid ${borderColor}`}
                borderRadius="18px"
                p={5}
                mb={5}
              >
                <VStack
                  align="start"
                  spacing={3}
                >
                  <Text
                    fontSize={
                      isMobile
                        ? "2xl"
                        : "3xl"
                    }
                    fontWeight="700"
                    lineHeight="1.15"
                  >
                    {focusNode.title}
                  </Text>

                  <Text
                    fontSize="md"
                    color={secondaryColor}
                  >
                    {focusNode.artist}
                  </Text>

                  <HStack
                    spacing={2}
                    flexWrap="wrap"
                  >
                    <Box
                      px={2.5}
                      py={1}
                      borderRadius="full"
                      border={`1px solid ${borderColor}`}
                    >
                      <Text
                        fontSize="xs"
                        fontWeight="600"
                      >
                        {getMovement(
                          focusNode.tags
                        )}
                      </Text>
                    </Box>

                    {(
                      focusNode.tags || []
                    )
                      .filter(
                        (tag) =>
                          tag.toLowerCase() !==
                          getMovement(
                            focusNode.tags
                          ).toLowerCase()
                      )
                      .slice(0, 4)
                      .map((tag) => (
                        <Box
                          key={tag}
                          px={2.5}
                          py={1}
                          borderRadius="full"
                          bg={
                            darkMode
                              ? "whiteAlpha.100"
                              : "blackAlpha.50"
                          }
                        >
                          <Text
                            fontSize="xs"
                            color={
                              secondaryColor
                            }
                          >
                            {tag}
                          </Text>
                        </Box>
                      ))}
                  </HStack>

                  <Divider
                    borderColor={borderColor}
                  />

                  {/* STATISTICS */}

                  <HStack
                    w="100%"
                    spacing={4}
                  >
                    <VStack
                      align="start"
                      spacing={0}
                      flex="1"
                    >
                      <Text
                        fontSize="10px"
                        textTransform="uppercase"
                        letterSpacing="0.08em"
                        color={secondaryColor}
                      >
                        Connections
                      </Text>

                      <Text
                        fontSize="xl"
                        fontWeight="700"
                      >
                        {
                          selectedConnections.length
                        }
                      </Text>
                    </VStack>

                    <VStack
                      align="start"
                      spacing={0}
                      flex="1"
                    >
                      <Text
                        fontSize="10px"
                        textTransform="uppercase"
                        letterSpacing="0.08em"
                        color={secondaryColor}
                      >
                        Best score
                      </Text>

                      <Text
                        fontSize="xl"
                        fontWeight="700"
                      >
                        {strongestRelationship
                          ? strongestRelationship.score.toFixed(
                            2
                          )
                          : "—"}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </Box>

              {/* STRONGEST RELATIONSHIP */}

              {strongestRelationship && (
                <Box mb={6}>
                  <Text
                    fontSize="10px"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="0.1em"
                    color={secondaryColor}
                    mb={3}
                  >
                    Strongest relationship
                  </Text>

                  <Box
                    border={`1px solid ${borderColor}`}
                    borderRadius="14px"
                    p={4}
                  >
                    <HStack
                      justify="space-between"
                      align="start"
                    >
                      <VStack
                        align="start"
                        spacing={1}
                      >
                        <Text
                          fontSize="md"
                          fontWeight="600"
                        >
                          {
                            strongestRelationship
                              .painting
                              .title
                          }
                        </Text>

                        <Text
                          fontSize="xs"
                          color={
                            secondaryColor
                          }
                        >
                          {
                            strongestRelationship
                              .painting
                              .artist
                          }
                        </Text>
                      </VStack>

                      <VStack
                        align="end"
                        spacing={0}
                      >
                        <Text
                          fontSize="xl"
                          fontWeight="700"
                        >
                          {strongestRelationship.score.toFixed(
                            2
                          )}
                        </Text>

                        <Text
                          fontSize="9px"
                          color={
                            secondaryColor
                          }
                          textTransform="uppercase"
                        >
                          score
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </Box>
              )}

              {/* ALL CONNECTIONS */}

              <Box>
                <HStack
                  justify="space-between"
                  mb={3}
                >
                  <Text
                    fontSize="10px"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="0.1em"
                    color={secondaryColor}
                  >
                    Related paintings
                  </Text>

                  <Text
                    fontSize="10px"
                    color={secondaryColor}
                  >
                    {selectedConnections.length}{" "}
                    connections
                  </Text>
                </HStack>

                <VStack
                  align="stretch"
                  spacing={2}
                >
                  {selectedConnections.map(
                    (connection, index) => (
                      <Box
                        key={
                          connection.painting.id
                        }
                        px={3}
                        py={3}
                        borderRadius="10px"
                        border={`1px solid ${borderColor}`}
                        cursor="pointer"
                        transition="all 0.15s"
                        _hover={{
                          bg: darkMode
                            ? "whiteAlpha.100"
                            : "blackAlpha.50",
                        }}
                        onClick={() =>
                          setFocusNode(
                            connection.painting
                          )
                        }
                      >
                        <HStack
                          justify="space-between"
                        >
                          <HStack
                            spacing={3}
                          >
                            <Text
                              fontSize="10px"
                              color={
                                secondaryColor
                              }
                              minW="14px"
                            >
                              {index + 1}
                            </Text>

                            <VStack
                              align="start"
                              spacing={0}
                            >
                              <Text
                                fontSize="sm"
                                fontWeight="600"
                                noOfLines={1}
                              >
                                {
                                  connection
                                    .painting
                                    .title
                                }
                              </Text>

                              <Text
                                fontSize="10px"
                                color={
                                  secondaryColor
                                }
                              >
                                {
                                  connection
                                    .painting
                                    .artist
                                }
                              </Text>
                            </VStack>
                          </HStack>

                          <Text
                            fontSize="sm"
                            fontWeight="700"
                          >
                            {connection.score.toFixed(
                              2
                            )}
                          </Text>
                        </HStack>
                      </Box>
                    )
                  )}
                </VStack>
              </Box>

              {/* EXPLANATION */}

              <Box
                mt={6}
                pt={5}
                borderTop={`1px solid ${borderColor}`}
              >
                <Text
                  fontSize="10px"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                  color={secondaryColor}
                  mb={2}
                >
                  About the score
                </Text>

                <Text
                  fontSize="xs"
                  color={secondaryColor}
                  lineHeight="1.6"
                >
                  Similarity combines TF-IDF cosine
                  similarity between the paintings'
                  tags and descriptions with additional
                  signals for shared artists and art
                  movements. A higher score indicates a
                  stronger overall relationship.
                </Text>
              </Box>

              {/* OPEN PAINTING */}

              <Box
                mt={5}
                p={3}
                borderRadius="10px"
                border={`1px solid ${borderColor}`}
                cursor="pointer"
                transition="all 0.15s"
                _hover={{
                  bg: darkMode
                    ? "whiteAlpha.100"
                    : "blackAlpha.50",
                }}
                onClick={() =>
                  navigate(
                    `/painting/${focusNode.id}`
                  )
                }
              >
                <HStack
                  justify="space-between"
                >
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                  >
                    Open painting
                  </Text>

                  <FiExternalLink
                    size={15}
                  />
                </HStack>
              </Box>

              {/* CLEAR SELECTION */}

              <Text
                mt={4}
                textAlign="center"
                fontSize="10px"
                color={secondaryColor}
                cursor="pointer"
                onClick={() =>
                  setFocusNode(null)
                }
              >
                Clear selection
              </Text>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}