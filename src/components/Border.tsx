import type { Graphics as PIXIGraphics } from "@pixi/graphics"
import { Container, Graphics, useTick } from "@pixi/react"
import type { Body, IChamferableBodyDefinition } from "matter-js"
import Matter from "matter-js"
import React from "react"
import { SCALE } from "./Graph"
import { extractCoordinates } from "./Node"

import { useEngine } from "./World"

const Border_Internal: React.FC = () => {
  const s = SCALE
  return (
    <Container>
      <Shape
        config={{ x: s / 2, y: s + 50, width: s, height: 100 }}
        options={{ isStatic: true }}
      />
      <Shape
        config={{ x: s / 2, y: -50, width: s, height: 100 }}
        options={{ isStatic: true }}
      />
      <Shape
        config={{ x: -50, y: s / 2, width: 100, height: s }}
        options={{ isStatic: true }}
      />
      <Shape
        config={{ x: s + 50, y: s / 2, width: 100, height: s }}
        options={{ isStatic: true }}
      />
    </Container>
  )
}

export const Border = React.memo(Border_Internal)

const Shape = ({
  config,
  options = {},
}: {
  config: { x: number; y: number; width: number; height: number }
  options?: IChamferableBodyDefinition
}) => {
  const engine = useEngine()
  const body = React.useRef<Body>(null) as React.MutableRefObject<Body>
  const graphics = React.useRef<PIXIGraphics>(null)

  useTick(() => {
    const g = graphics.current
    const b = body.current

    if (!g) return

    g.clear()

    g.moveTo(...extractCoordinates(b.vertices[0]))
    for (var j = 1; j < b.vertices.length; j += 1) {
      g.lineTo(...extractCoordinates(b.vertices[j]))
    }
    g.lineTo(...extractCoordinates(b.vertices[0]))
  })

  React.useEffect(() => {
    if (!engine) return

    body.current = Matter.Bodies.rectangle(
      ...[config.x, config.y, config.width, config.height],
      options
    )

    Matter.World.add(engine.world, body.current)

    return () => {
      Matter.World.remove(engine.world, body.current)
    }
  }, [])

  return <Graphics ref={graphics} />
}
