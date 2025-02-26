import "@pixi/events"

import { Stage } from "@pixi/react"
import React from "react"
import { createConnections } from "../logic/createConnections"
import { createEdges } from "../logic/createEdges"
import { createNodes, NodeType } from "../logic/createNodes"
import { fake_tags } from "../mocks/tags"
import { Node } from "./Node"

import style from "./Graph.module.scss"
import { Line } from "./Line"
import { World } from "./World"
import { Mouse } from "./Mouse"
import { Border } from "./Border"
import { Label } from "./Label"

export const SCALE = 350
export const RESOLUTION = 2

export const Graph: React.FC = () => {
  const tags = fake_tags
  const connections = createConnections(tags)
  const edges = createEdges(connections)
  const [nodes, setNodes] = React.useState<NodeType[]>(
    createNodes(connections)
  )
  return (
    <div className={style.wrapper}>
      <section>
        <Stage
          width={SCALE}
          height={SCALE}
          options={{ resolution: RESOLUTION, antialias: true }}
        >
          <World>
            <Border />
            <Mouse>
              {edges.map(({ source, target }) => {
                const sourceNode = nodes.find((node) => node.key === source)
                const targetNode = nodes.find((node) => node.key === target)
                if (!sourceNode) return null
                if (!targetNode) return null
                return (
                  <Line
                    key={`${source}-${target}`}
                    x1={sourceNode.position.x}
                    y1={sourceNode.position.y}
                    x2={targetNode.position.x}
                    y2={targetNode.position.y}
                    color={"#1e1e1e"}
                  />
                )
              })}
              {nodes.map((node) => {
                return (
                  <React.Fragment key={node.key}>
                    <Label
                      text={node.key}
                      anchor={0.5}
                      x={node.position.x}
                      y={node.position.y + 20}
                      opacity={1}
                      color={"#ffffff"}
                    />
                    <Node
                      x={node.position.x}
                      y={node.position.y}
                      radius={20}
                      setNodes={setNodes}
                      id={node.key}
                    />
                  </React.Fragment>
                )
              })}
            </Mouse>
          </World>
        </Stage>
      </section>
    </div>
  )
}
