<template>
  <div class="iq-react-wrapper">
    <!-- Circular ring with three phase nodes -->
    <div class="iq-react-ring">
      <svg class="iq-react-svg" viewBox="0 0 200 200">
        <circle class="iq-react-track" cx="100" cy="100" r="70" />
        <circle class="iq-react-pulse" cx="100" cy="100" r="70" />
      </svg>

      <!-- Phase nodes -->
      <div class="iq-react-node iq-react-reason" :class="{ active: phase === 'reason' }">
        <span>Reason</span>
      </div>
      <div class="iq-react-node iq-react-action" :class="{ active: phase === 'action' }">
        <span>Action</span>
      </div>
      <div class="iq-react-node iq-react-observe" :class="{ active: phase === 'observe' }">
        <span>Observe</span>
      </div>

      <!-- Center: goal check -->
      <div class="iq-react-center">
        <span class="iq-react-goal">Goal met?</span>
      </div>
    </div>

    <!-- Tool pills that fly out from Action -->
    <div class="iq-react-tools">
      <TransitionGroup name="iq-tool-pop">
        <span
          v-for="tool in visibleTools"
          :key="tool.name"
          class="iq-react-tool-pill"
          :class="tool.iqClass"
        ><span class="iq-react-tool-icon">{{ tool.icon }}</span> {{ tool.name }}</span>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const tools = [
  { name: 'Work IQ Mail → dispatcher repair ETA emails',     icon: '🏢', iqClass: 'iq-tool-work',    group: 'work' },
  { name: 'Work IQ Calendar → crew shift schedules',         icon: '🏢', iqClass: 'iq-tool-work',    group: 'work' },
  { name: 'Work IQ Teams → ops channel crew availability',   icon: '🏢', iqClass: 'iq-tool-work',    group: 'work' },
  { name: 'Fabric IQ Ontology → gate & flight relationships', icon: '📊', iqClass: 'iq-tool-fabric',  group: 'fabric' },
  { name: 'Fabric IQ Data Agent → duty window query',        icon: '📊', iqClass: 'iq-tool-fabric',  group: 'fabric' },
  { name: 'Foundry IQ Knowledge → airbridge failure SOPs',   icon: '🧠', iqClass: 'iq-tool-foundry', group: 'foundry' },
  { name: 'Foundry IQ Web → latest safety bulletins',        icon: '🧠', iqClass: 'iq-tool-foundry', group: 'foundry' },
  { name: 'Bing Custom Search → airport weather & NOTAMs',   icon: '🔍', iqClass: 'iq-tool-mcp',     group: 'mcp' },
  { name: 'MCP: Maintenance API → parts & repair status',    icon: '🔌', iqClass: 'iq-tool-mcp',     group: 'mcp' },
  { name: 'Foundry Tool: notify_passengers → SMS & app',     icon: '🛠️', iqClass: 'iq-tool-mcp',     group: 'mcp' },
]

const phase = ref('reason')
const phases = ['reason', 'action', 'observe']
const phaseIndex = ref(0)
const visibleTools = ref([])

let interval = null
let toolTimeout = null
let cycleCount = 0

function tick () {
  phaseIndex.value = (phaseIndex.value + 1) % 3
  phase.value = phases[phaseIndex.value]

  if (phase.value === 'action') {
    cycleCount++
    // Rotate through groups including mcp tools
    const groups = ['work', 'fabric', 'foundry', 'mcp']
    const primaryGroup = groups[(cycleCount - 1) % 4]
    const secondaryGroup = groups[cycleCount % 4]

    const primaryTools = tools.filter(t => t.group === primaryGroup)
    const secondaryTools = tools.filter(t => t.group === secondaryGroup)

    // Pick 1 from primary, 1 from secondary, sometimes a 3rd
    const selected = [
      primaryTools[Math.floor(Math.random() * primaryTools.length)],
      secondaryTools[Math.floor(Math.random() * secondaryTools.length)],
    ]
    // Add a third tool from a different group for variety
    const thirdGroup = groups[(cycleCount + 1) % 4]
    const thirdTools = tools.filter(t => t.group === thirdGroup)
    if (thirdTools.length > 0 && Math.random() > 0.3) {
      selected.push(thirdTools[Math.floor(Math.random() * thirdTools.length)])
    }

    visibleTools.value = []
    selected.forEach((t, i) => {
      setTimeout(() => {
        visibleTools.value = [...visibleTools.value, { ...t }]
      }, i * 600)
    })
    toolTimeout = setTimeout(() => {
      visibleTools.value = []
    }, 3600)
  }
}

onMounted(() => {
  interval = setInterval(tick, 4000)
})

onUnmounted(() => {
  clearInterval(interval)
  clearTimeout(toolTimeout)
})
</script>

<style scoped>
.iq-react-wrapper {
  display: grid;
  grid-template-columns: 160px 320px;
  align-items: center;
  justify-content: center;
  column-gap: 1.2rem;
  margin: 0 auto;
  min-height: 160px;
  width: 100%;
}

.iq-react-ring {
  position: relative;
  width: 160px;
  height: 160px;
  flex-shrink: 0;
}

.iq-react-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.iq-react-track {
  fill: none;
  stroke: rgba(56, 164, 220, 0.12);
  stroke-width: 2.5;
}

.iq-react-pulse {
  fill: none;
  stroke: rgba(56, 164, 220, 0.4);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 110 330;
  stroke-dashoffset: 0;
  animation: iq-orbit 4.8s linear infinite;
}

@keyframes iq-orbit {
  to { stroke-dashoffset: -440; }
}

/* Phase nodes positioned on the circle */
.iq-react-node {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.iq-react-node span {
  display: inline-block;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
  color: white;
  white-space: nowrap;
  letter-spacing: 0.03em;
  min-width: 4.5rem;
  text-align: center;
}

.iq-react-node.active {
  transform: scale(1.18);
  filter: brightness(1.2);
}

/* Reason — top-left */
.iq-react-reason {
  top: -6px;
  left: -10px;
}
.iq-react-reason span {
  background: linear-gradient(135deg, #4878c8, #6a96dc);
}

/* Action — right */
.iq-react-action {
  top: 50%;
  right: -36px;
  transform: translateY(-50%);
}
.iq-react-action.active {
  transform: translateY(-50%) scale(1.18);
}
.iq-react-action span {
  background: linear-gradient(135deg, #b84c4c, #d06868);
}

/* Observe — bottom-left */
.iq-react-observe {
  bottom: -6px;
  left: -10px;
}
.iq-react-observe span {
  background: linear-gradient(135deg, #2a8db5, #38A4DC);
}

/* Center */
.iq-react-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.iq-react-goal {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--theme-deep, #103954);
  line-height: 1;
  white-space: nowrap;
}

/* Tool pills */
.iq-react-tools {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 320px;
  min-width: 320px;
  margin-left: 1.75rem;
}

.iq-react-tool-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  background: rgba(120, 144, 156, 0.7);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.iq-react-tool-icon {
  font-size: 0.78rem;
}

/* IQ-specific tool colors */
.iq-tool-work {
  background: linear-gradient(135deg, #0078D4, #2b9aed);
}

.iq-tool-fabric {
  background: linear-gradient(135deg, #117865, #2AAC94);
}

.iq-tool-foundry {
  background: linear-gradient(135deg, #584ACF, #7B6FE6);
}

.iq-tool-mcp {
  background: linear-gradient(135deg, #78909c, #90a4ae);
}

/* Transition animations */
.iq-tool-pop-enter-active {
  animation: iq-tool-fly-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.iq-tool-pop-leave-active {
  animation: iq-tool-fly-in 0.25s ease reverse;
}

@keyframes iq-tool-fly-in {
  from {
    opacity: 0;
    transform: translateX(0) scale(0.82);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}
</style>
