const GRAPH_URL = "http://localhost:5000/graph.json";

export async function getGraph() {
  const res = await fetch(GRAPH_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch graph data");
  }

  return res.json();
}