import { Text } from "@pixi/react"

export const Label = (props: {
  text: string
  x: number
  y: number
  opacity: number
  anchor: number
  color: string
}) => {
  return (
    <Text
      text={props.text}
      x={props.x}
      y={props.y}
      anchor={props.anchor}
      // @ts-expect-error
      style={{
        fontFamily: "Arial",
        fontSize: 12,
        fill: props.color,
        fontWeight: "400",
        align: "center",
      }}
    />
  )
}