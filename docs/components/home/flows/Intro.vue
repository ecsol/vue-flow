<script lang="ts" setup>
import { Handle, Position, VueFlow, useVueFlow } from '@braks/vue-flow'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import BoxNode from '../nodes/Box.vue'
import Heart from '~icons/mdi/heart'

const breakpoints = useBreakpoints(breakpointsTailwind)

const initialEdges = [
  {
    id: 'eintro-examples',
    type: 'smoothstep',
    sourceHandle: 'a',
    source: 'intro',
    target: 'examples',
    animated: true,
    style: { strokeWidth: 2, stroke: '#8b5cf6' },
  },
  {
    id: 'eintro-documentation',
    type: 'smoothstep',
    sourceHandle: 'a',
    source: 'intro',
    target: 'documentation',
    animated: true,
    style: { strokeWidth: 2, stroke: '#f97316' },
  },
  {
    id: 'eintro-acknowledgement',
    type: 'smoothstep',
    sourceHandle: 'a',
    source: 'intro',
    target: 'acknowledgement',
    animated: true,
    style: { strokeWidth: 2, stroke: '#0ea5e9' },
  },
]
const { dimensions, instance, onPaneReady, getNodes, getNode, getEdge, updateEdge, edges, setEdges } = useVueFlow({
  nodes: [
    { id: 'intro', type: 'box', position: { x: 0, y: 0 } },
    { id: 'examples', type: 'box', position: { x: -50, y: 400 } },
    { id: 'documentation', type: 'box', position: { x: 300, y: 400 } },
    { id: 'acknowledgement', type: 'box', position: { x: 150, y: 500 } },
  ],
  edges: initialEdges,
  elementsSelectable: true,
  nodesDraggable: false,
  panOnDrag: false,
  zoomOnScroll: false,
})

const init = ref(false)
const edgeId = ref('eintro-documentation')
const el = templateRef<HTMLDivElement>('el', null)

onPaneReady(({ fitView }) => {
  const setNodes = () => {
    if (breakpoints.isSmaller('md')) {
      const mainNode = getNode.value('intro')!
      getNodes.value.forEach((node) => {
        switch (node.id) {
          case 'intro':
            node.position = { x: 0, y: 0 }
            break
          case 'examples':
            node.position = {
              x: mainNode.dimensions.width / 2 - node.dimensions.width / 2,
              y: mainNode.dimensions.height * 1.5,
            }
            break
          case 'documentation':
            node.position = {
              x: mainNode.dimensions.width / 2 - node.dimensions.width / 2,
              y: mainNode.dimensions.height * 2 + 50,
            }
            break
          case 'acknowledgement':
            node.position = {
              x: mainNode.dimensions.width / 2 - node.dimensions.width / 2,
              y: mainNode.dimensions.height * 3,
            }
            break
        }
      })

      nextTick(() => {
        setEdges(() => {
          return [
            {
              id: 'eintro-examples',
              type: 'smoothstep',
              sourceHandle: 'a',
              source: 'intro',
              target: 'examples',
              animated: true,
              style: { strokeWidth: 2, stroke: '#8b5cf6' },
            },
            {
              id: 'eexamples-documentation',
              type: 'smoothstep',
              source: 'examples',
              target: 'documentation',
              animated: true,
              style: { strokeWidth: 2, stroke: '#f97316' },
            },
            {
              id: 'edocumentation-acknowledgement',
              type: 'smoothstep',
              source: 'documentation',
              target: 'acknowledgement',
              animated: true,
              style: { strokeWidth: 2, stroke: '#0ea5e9' },
            },
          ]
        })

        fitView({
          duration: 1500,
        })
      })
    } else {
      getNodes.value.forEach((node) => {
        const mainNode = getNode.value('intro')!
        switch (node.id) {
          case 'intro':
            node.position = { x: 0, y: 0 }
            break
          case 'examples':
            node.position = { x: -node.dimensions.width / 2, y: mainNode.dimensions.height * 1.5 }
            break
          case 'documentation':
            node.position = {
              x: mainNode.dimensions.width - node.dimensions.width / 2,
              y: mainNode.dimensions.height * 1.5,
            }
            break
          case 'acknowledgement':
            node.position = {
              x: mainNode.dimensions.width / 2 - node.dimensions.width / 2,
              y: mainNode.dimensions.height * 2,
            }
            break
        }
      })

      nextTick(() => {
        setEdges(initialEdges)
        fitView({
          duration: 1500,
        })
      })
    }

    setTimeout(
      () => {
        if (!init.value) init.value = true
        else instance.value?.fitView()
      },
      init.value ? 5 : 1505,
    )
  }

  useResizeObserver(el, setNodes)
})

const scrollTo = () => {
  const el = document.getElementById('acknowledgement')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <VueFlow ref="el" class="dark:bg-black bg-white transition-colors duration-200 ease-in-out">
    <template #node-box="props">
      <template v-if="props.id === 'intro'">
        <div class="max-w-[500px]">
          <BoxNode class="intro">
            <div class="font-mono flex flex-col gap-4 p-4 items-center text-center">
              <h1 class="text-2xl lg:text-4xl">Vue Flow</h1>
              <h2 class="text-lg lg:text-xl font-normal !border-0">
                The customizable Vue 3 component bringing interactivity to flowcharts and graphs.
              </h2>
            </div>
          </BoxNode>
        </div>
      </template>
      <template v-else-if="props.id === 'documentation'">
        <div class="flex">
          <router-link class="link group bg-orange-500" to="/guide/"> Read The Documentation </router-link>
        </div>
        <Handle type="target" :position="Position.Top" />
        <Handle class="block md:hidden" type="source" :position="Position.Bottom" />
      </template>
      <template v-else-if="props.id === 'examples'">
        <div class="flex">
          <router-link class="link group bg-purple-500" to="/examples/"> Check The Examples </router-link>
        </div>
        <Handle type="target" :position="Position.Top" />
        <Handle class="block md:hidden" type="source" :position="Position.Bottom" />
      </template>
      <template v-else-if="props.id === 'acknowledgement'">
        <div class="flex" @click="scrollTo">
          <div class="link group bg-sky-500"><Heart class="text-red-500" /> Acknowledgement</div>
        </div>
        <Handle type="target" :position="Position.Top" />
      </template>
    </template>
  </VueFlow>
</template>

<style>
.intro {
  @apply cursor-pointer
  bg-green-500
  text-white
  transform
  transition-transform
  duration-300
  hover:(scale-105 ring ring-white);
}

.link {
  @apply flex
  gap-3
  items-center
  p-4
  shadow-lg
  transform
  transition-transform
  duration-300
  hover:(scale-102)
  transition-colors
  ease-in-out
  rounded-lg
  text-white
  font-semibold
  text-lg;
}
</style>
