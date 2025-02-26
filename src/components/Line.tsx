import { Graphics } from "@pixi/react"
import React from "react"
import { Draw } from "./Node"

export const Line = (props: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
}) => {
  const draw = React.useCallback<Draw>(
    (g) => {
      g.clear()
      g.lineStyle(1, props.color, 1)
      g.moveTo(props.x1, props.y1)
      g.lineTo(props.x2, props.y2)
    },
    [props]
  )

  return <Graphics draw={draw} />
}
