import type { Connections } from "./createConnections"

export interface Edge {
  source: string;
  target: string;
}
export const createEdges = (connections: Connections): Edge[] => {
  const edges = Array.from(connections.entries())
    .map(([source, targets]) =>
      [...targets].map((target) => ({ source, target }))
    )
    .flat()
  const unique = new Set<string>()
  const uniqueEdges = edges.filter(({ source, target }) => {
    if (unique.has(`${target}-${source}`)) return false
    unique.add(`${source}-${target}`)
    return true
  })
  return uniqueEdges
}