import type { Graphics as PIXIGraphics } from "@pixi/graphics"
import { Graphics, useTick } from "@pixi/react"
import type { Body } from "matter-js"
import Matter from "matter-js"
import React from "react"
import { NodeType } from "../logic/createNodes"

import { useEngine } from "./World"

export const extractCoordinates = (vertice: {
  x: number
  y: number
}): [number, number] => [vertice.x, vertice.y]

interface NodeProps {
  x: number
  y: number
  radius: number
  id: string
  setNodes: React.Dispatch<React.SetStateAction<NodeType[]>>
}

export const Node = (props: NodeProps) => {
  const engine = useEngine()
  const body = React.useRef<Body>(null) as React.MutableRefObject<Body>
  const graphics = React.useRef<PIXIGraphics>(null)
  const lastPosition = React.useRef({ x: props.x, y: props.y })

  useTick(() => {
    const g = graphics.current
    const b = body.current

    if (!g) return

    g.clear()

    g.lineStyle(0)

    g.moveTo(...extractCoordinates(b.vertices[0]))
    for (var j = 1; j < b.vertices.length; j += 1) {
      g.lineTo(...extractCoordinates(b.vertices[j]))
    }
    g.lineTo(...extractCoordinates(b.vertices[0]))

    g.alpha = 1
    g.lineStyle(0)
    g.beginFill(`#a39af7`)
    g.drawCircle(b.position.x, b.position.y, props.radius - 15)

    if (
      Math.abs(lastPosition.current.x - b.position.x) > 0.1 ||
      Math.abs(lastPosition.current.y - b.position.y) > 0.1
    ) {
      lastPosition.current = { x: b.position.x, y: b.position.y }
      props.setNodes((prev: NodeType[]) => {
        return prev.map((node) => {
          if (node.key === props.id) {
            return {
              ...node,
              position: {
                x: b.position.x,
                y: b.position.y,
              },
            }
          }
          return node
        })
      })
    }
  })

  React.useEffect(() => {
    if (!engine) return

    body.current = Matter.Bodies.circle(...[props.x, props.y, props.radius], {
      friction: 1,
      density: 0.1,
      restitution: 0,
      frictionAir: 0.09,
      frictionStatic: 1,
    })

    Matter.World.add(engine.world, body.current)

    return () => {
      Matter.World.remove(engine.world, body.current)
    }
  }, [])

  return <Graphics ref={graphics} interactive cursor="pointer" />
}