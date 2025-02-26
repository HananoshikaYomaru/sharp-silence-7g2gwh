import { useApp } from "@pixi/react"
import Matter from "matter-js"
import React from "react"
import { RESOLUTION } from "./Graph"

import { useEngine } from "./World"

export const Mouse: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const app = useApp()
  const engine = useEngine()

  React.useEffect(() => {
    if (!engine) return
    const mouse = Matter.Mouse.create(app.view as HTMLCanvasElement)
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2 },
    })

    const scale = RESOLUTION / Math.pow(RESOLUTION, 2)
    Matter.Mouse.setScale(mouse, { x: scale, y: scale })

    Matter.World.add(engine.world, mouseConstraint)

    return () => {
      Matter.World.remove(engine.world, mouseConstraint)
    }
  }, [])

  return <React.Fragment>{children}</React.Fragment>
}