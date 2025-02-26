import { SCALE } from "../components/Graph"
import { Connections } from "./createConnections"

export interface NodeType {
  key: string;
  position: { x: number; y: number; };
}

export const createNodes = (connections: Connections): NodeType[] => {
  const nodeKeys = Array.from(connections.keys())
  const nodes = nodeKeys.map((key) => ({
    key,
    position: { x: Math.random() * SCALE, y: Math.random() * SCALE },
  }))
  return nodes
}