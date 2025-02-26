export type Connections = Map<string, Set<string>>

export const createConnections = (tags: string[][]) => {
  const connections = new Map<string, Set<string>>()
  tags.forEach((tagList) => {
    tagList.forEach((tag) => {
      if (!connections.has(tag)) {
        connections.set(tag, new Set())
      }
      const newSet = connections.get(tag) ?? new Set()
      tagList.forEach((otherTag) => {
        if (tag === otherTag) return
        newSet.add(otherTag)
      })
      connections.set(tag, newSet)
    })
  })
  return connections
}
