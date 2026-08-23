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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSun, FiMoon } from "react-icons/fi";

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
    artistColors.set(artist, palette[colorIndex % palette.length]);
    colorIndex++;
  }
  return artistColors.get(artist)!;
}

const getMovement = (tags: string[] = []) => {
  const movements = [
    "renaissance",
    "baroque",
    "romanticism",
    "neoclassicism",
    "symbolism",
    "realism",
    "gothic",
  ];

  return tags.find((t) => movements.includes(t.toLowerCase())) || "unknown";
};

export default function GraphView() {
  const [graph, setGraph] = useState<GraphData | null>(null);
  const [focusNode, setFocusNode] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(true);

  const fgRef = useRef<any>(null);
  const navigate = useNavigate();

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    getGraph().then(setGraph).catch(console.error);
  }, []);

  useEffect(() => {
    if (!graph || !fgRef.current) return;

    setTimeout(() => {
      fgRef.current.zoomToFit(600, isMobile ? 40 : 80);
    }, 700);
  }, [graph, isMobile]);

  useEffect(() => {
    if (!fgRef.current || !graph) return;

    fgRef.current.d3Force("charge").strength(isMobile ? -80 : -160);

    fgRef.current.d3Force("link").distance((l: any) => {
      return (isMobile ? 50 : 70) + (l.weight || 1) * 8;
    });
  }, [graph, isMobile]);

  const isNeighbor = (node: any) => {
    if (!focusNode) return true;

    return graph!.links.some((l: any) => {
      const s = l.source.id || l.source;
      const t = l.target.id || l.target;

      return (
        (s === focusNode.id && t === node.id) ||
        (t === focusNode.id && s === node.id)
      );
    });
  };

  if (!graph) return <div>Loading graph...</div>;

  // 🎯 FIXED ICON COLOR (THE IMPORTANT PART)
  const iconColor = darkMode ? "white" : "black";

  return (
    <Box
      w="100vw"
      h="100vh"
      bg={darkMode ? "black" : "white"}
      position="relative"
      overflow="hidden"
    >

      {/* 🌟 TOP MENU */}
      <Box
        position="absolute"
        top="10px"
        left="50%"
        transform="translateX(-50%)"
        zIndex={10}
        px={4}
        py={2}
        borderRadius="12px"
        bg={darkMode ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)"}
        backdropFilter="blur(12px)"
        border="1px solid rgba(255,255,255,0.1)"
        w={isMobile ? "92%" : "auto"}
      >
        <HStack spacing={4} justify="space-between">

          {/* LEFT SIDE */}
          <HStack spacing={3}>
            <IconButton
              size="sm"
              aria-label="back"
              icon={<FiArrowLeft />}
              onClick={() => navigate(-1)}
              variant="ghost"
              color={iconColor}   // ✅ FIX
              _hover={{ bg: darkMode ? "whiteAlpha.200" : "blackAlpha.200" }}
            />

            <Text
              fontWeight="600"
              fontSize={isMobile ? "sm" : "md"}
              color={iconColor}   // optional consistency
            >
              Paintings Graph
            </Text>
          </HStack>

          {/* RIGHT SIDE */}
          <HStack spacing={2}>

            <FiSun color={iconColor} />   {/* ✅ FIX */}

            <Switch
              isChecked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />

            <FiMoon color={iconColor} />  {/* ✅ FIX */}

          </HStack>
        </HStack>
      </Box>

      {/* 🧭 INFO PANEL */}
      {focusNode && (
        <Box
          position="absolute"
          bottom={isMobile ? "10px" : "20px"}
          right={isMobile ? "10px" : "20px"}
          w={isMobile ? "calc(100vw - 20px)" : "280px"}
          bg={darkMode ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.9)"}
          color={iconColor}
          p={4}
          borderRadius="12px"
        >
          <VStack align="start" spacing={2}>
            <Text fontSize={isMobile ? "xl" : "lg"} fontWeight="bold">
              {focusNode.title}
            </Text>

            <Text fontSize={isMobile ? "md" : "sm"} opacity={0.8}>
              👨‍🎨 {focusNode.artist}
            </Text>

            <Text fontSize={isMobile ? "md" : "sm"} opacity={0.8}>
              🏛 {getMovement(focusNode.tags)}
            </Text>
          </VStack>
        </Box>
      )}

      {/* GRAPH */}
      <ForceGraph2D
        ref={fgRef}
        graphData={graph}
        cooldownTicks={200}
        d3AlphaDecay={0.02}
        d3VelocityDecay={isMobile ? 0.2 : 0.12}
        linkColor={() =>
          darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"
        }
        linkWidth={(l: any) => Math.max(1, (l.weight || 1) / 2)}
        onNodeClick={(node: any) => setFocusNode(node)}
        onNodeRightClick={(node: any) => {
          setFocusNode(null);
          navigate(`/painting/${node.id}`);
        }}

        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const color = getArtistColor(node.artist);
          const neighbor = isNeighbor(node);

          const size = focusNode
            ? node.id === focusNode.id
              ? 8
              : neighbor
              ? 5
              : 3
            : 4;

          const alpha = focusNode ? (neighbor ? 1 : 0.3) : 1;

          ctx.beginPath();
          ctx.arc(node.x, node.y, size + 2, 0, Math.PI * 2);
          ctx.fillStyle = color + "30";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = alpha;
          ctx.fill();
          ctx.globalAlpha = 1;

          const fontSize = isMobile ? 16 : Math.max(10, 12 / globalScale);

          if (!isMobile || focusNode?.id === node.id) {
            ctx.font = `bold ${fontSize}px Sans-Serif`;
            ctx.fillStyle = iconColor; // optional consistency
            ctx.fillText(node.title, node.x + 8, node.y + 4);
          }
        }}
      />
    </Box>
  );
}