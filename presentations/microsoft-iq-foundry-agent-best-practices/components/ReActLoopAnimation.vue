<template>
  <div class="react-loop" @click="advance">
    <!-- Task Banner -->
    <div class="task-banner">
      <span class="task-label">TASK</span>
      Assess runway 27L maintenance status and impact on flight schedule
    </div>

    <!-- Phase Badge & Step Counter -->
    <div class="status-bar">
      <span v-if="step > 0" class="phase-badge" :class="phaseClass">{{ phaseLabel }}</span>
      <span class="step-counter">Step {{ step }}/9</span>
    </div>

    <!-- Main SVG Canvas -->
    <svg viewBox="0 0 1100 420" class="canvas">
      <!-- Connection lines (drawn behind everything) -->
      <line
        v-for="tool in tools"
        :key="'line-' + tool.id"
        :x1="centerX" :y1="centerY"
        :x2="tool.x" :y2="tool.y"
        class="conn-line"
        :class="{ active: tool.id === activeTool }"
      />

      <!-- Animated arrows -->
      <g v-if="arrowVisible">
        <!-- ACTION arrow: agent → tool -->
        <line
          v-if="phase === 'action'"
          :x1="centerX" :y1="centerY"
          :x2="activeToolData.x" :y2="activeToolData.y"
          class="arrow-line action-arrow"
        />
        <!-- OBSERVE arrow: tool → agent -->
        <line
          v-if="phase === 'observe'"
          :x1="activeToolData.x" :y1="activeToolData.y"
          :x2="centerX" :y2="centerY"
          class="arrow-line observe-arrow"
        />
      </g>

      <!-- Tool Nodes -->
      <g v-for="tool in tools" :key="tool.id">
        <rect
          :x="tool.x - 90" :y="tool.y - 30"
          width="180" height="60" rx="10"
          class="tool-node"
          :class="{ highlighted: tool.id === activeTool }"
        />
        <text :x="tool.x" :y="tool.y - 6" class="tool-icon">{{ tool.icon }}</text>
        <text :x="tool.x" :y="tool.y + 16" class="tool-label">{{ tool.label }}</text>
      </g>

      <!-- Agent Brain -->
      <circle :cx="centerX" :cy="centerY" r="52" class="agent-brain" />
      <text :x="centerX" :y="centerY - 8" class="agent-icon">🤖</text>
      <text :x="centerX" :y="centerY + 18" class="agent-label">Agent</text>
    </svg>

    <!-- Thought Bubble (REASON phase) -->
    <div v-if="phase === 'reason' && thoughtText" class="thought-bubble">
      <span class="thought-label">💭 REASON</span>
      {{ thoughtText }}
    </div>

    <!-- Action Label -->
    <div v-if="phase === 'action' && actionText" class="action-label-box">
      <code>{{ actionText }}</code>
    </div>

    <!-- Observe Result -->
    <div v-if="phase === 'observe' && observeText" class="observe-result" :class="{ final: step === 9 }">
      {{ observeText }}
    </div>

    <!-- Click hint -->
    <div class="click-hint" v-if="step < 9">Click to advance →</div>
    <div class="click-hint done" v-else>✅ Loop complete</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const step = ref(0)

const centerX = 550
const centerY = 210

const tools = [
  { id: 'flight',      label: 'Flight Schedule',   icon: '✈️', x: 200, y: 70 },
  { id: 'maintenance', label: 'Maintenance Logs',   icon: '🔧', x: 900, y: 70 },
  { id: 'ops',         label: 'Ops Notification',   icon: '📢', x: 200, y: 350 },
  { id: 'weather',     label: 'Weather Data',       icon: '🌦️', x: 900, y: 350 },
]

const stepConfig = {
  1: { phase: 'reason',  tool: null,          thought: 'I need to check the current flight schedule for runway 27L' },
  2: { phase: 'action',  tool: 'flight',      action: 'get_flight_schedule(runway="27L")' },
  3: { phase: 'observe', tool: 'flight',      observe: '3 flights scheduled next 4 hours' },
  4: { phase: 'reason',  tool: null,          thought: 'Now I need the maintenance log to check for conflicts' },
  5: { phase: 'action',  tool: 'maintenance', action: 'get_maintenance_log(asset="runway-27L")' },
  6: { phase: 'observe', tool: 'maintenance', observe: 'Scheduled resurfacing in 2 hours — conflict detected' },
  7: { phase: 'reason',  tool: null,          thought: 'Conflict found. I need to notify operations team' },
  8: { phase: 'action',  tool: 'ops',         action: 'notify_operations(priority="high", message="...")' },
  9: { phase: 'observe', tool: 'ops',         observe: '✅ Operations notified. Recommendation: Redirect flights to runway 09R, proceed with maintenance window.' },
}

const currentConfig = computed(() => stepConfig[step.value] || {})
const phase = computed(() => currentConfig.value.phase || null)
const activeTool = computed(() => currentConfig.value.tool || null)
const thoughtText = computed(() => currentConfig.value.thought || '')
const actionText = computed(() => currentConfig.value.action || '')
const observeText = computed(() => currentConfig.value.observe || '')

const activeToolData = computed(() => tools.find(t => t.id === activeTool.value) || { x: 0, y: 0 })
const arrowVisible = computed(() => (phase.value === 'action' || phase.value === 'observe') && activeTool.value)

const phaseLabel = computed(() => {
  if (phase.value === 'reason') return 'REASON'
  if (phase.value === 'action') return 'ACTION'
  if (phase.value === 'observe') return 'OBSERVE'
  return ''
})

const phaseClass = computed(() => phase.value || '')

function advance() {
  if (step.value < 9) step.value++
}
</script>

<style scoped>
.react-loop {
  position: relative;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  cursor: pointer;
  user-select: none;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

/* Task Banner */
.task-banner {
  background: #103954;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  margin-bottom: 6px;
}
.task-label {
  background: #FE5B38;
  color: #fff;
  font-weight: 700;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  margin-right: 8px;
  letter-spacing: 0.5px;
}

/* Status Bar */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  min-height: 28px;
}
.phase-badge {
  font-weight: 700;
  font-size: 13px;
  padding: 3px 14px;
  border-radius: 14px;
  color: #fff;
  letter-spacing: 1px;
  transition: background-color 0.3s ease;
}
.phase-badge.reason  { background: #5B5FC7; }
.phase-badge.action  { background: #FE5B38; }
.phase-badge.observe { background: #38A4DC; }

.step-counter {
  font-size: 13px;
  color: #667;
  font-weight: 600;
}

/* SVG Canvas */
.canvas {
  width: 100%;
  display: block;
}

/* Connection lines */
.conn-line {
  stroke: #d0d6dd;
  stroke-width: 1.5;
  stroke-dasharray: 6 4;
  transition: stroke 0.3s ease;
}
.conn-line.active {
  stroke: #999;
  stroke-width: 2;
}

/* Animated arrows */
.arrow-line {
  stroke-width: 3.5;
  stroke-linecap: round;
  fill: none;
}
.action-arrow {
  stroke: #FE5B38;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash-forward 0.5s ease forwards;
}
.observe-arrow {
  stroke: #38A4DC;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash-forward 0.5s ease forwards;
}

@keyframes dash-forward {
  to { stroke-dashoffset: 0; }
}

/* Tool Nodes */
.tool-node {
  fill: #EBF0F5;
  stroke: #c8ced6;
  stroke-width: 2;
  transition: stroke 0.3s ease, stroke-width 0.3s ease, fill 0.3s ease;
}
.tool-node.highlighted {
  stroke: #FE5B38;
  stroke-width: 3;
  fill: #fff;
}

.tool-icon {
  font-size: 18px;
  text-anchor: middle;
  dominant-baseline: central;
}
.tool-label {
  font-size: 12px;
  fill: #333;
  text-anchor: middle;
  font-weight: 600;
}

/* Agent Brain */
.agent-brain {
  fill: #103954;
  stroke: #5B5FC7;
  stroke-width: 3;
  transition: stroke 0.3s ease;
}
.agent-icon {
  font-size: 26px;
  text-anchor: middle;
  dominant-baseline: central;
}
.agent-label {
  font-size: 13px;
  fill: #fff;
  text-anchor: middle;
  font-weight: 700;
}

/* Thought Bubble */
.thought-bubble {
  position: absolute;
  top: 155px;
  left: 50%;
  transform: translateX(-50%);
  background: #ECEDF8;
  border: 2px solid #5B5FC7;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 13px;
  color: #333;
  max-width: 420px;
  text-align: center;
  animation: fade-in 0.35s ease;
  z-index: 10;
}
.thought-label {
  font-weight: 700;
  color: #5B5FC7;
  margin-right: 6px;
}

/* Action Label */
.action-label-box {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: #FFF3F0;
  border: 2px solid #FE5B38;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 12px;
  animation: fade-in 0.35s ease;
  z-index: 10;
}
.action-label-box code {
  color: #C03A1A;
  font-family: 'Cascadia Code', 'Fira Code', monospace;
  font-size: 12px;
}

/* Observe Result */
.observe-result {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: #EAF6FC;
  border: 2px solid #38A4DC;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 13px;
  color: #1a5a7a;
  max-width: 520px;
  text-align: center;
  animation: fade-in 0.35s ease;
  z-index: 10;
}
.observe-result.final {
  background: #E8F5E9;
  border-color: #43A047;
  color: #1B5E20;
  font-weight: 600;
}

/* Click Hint */
.click-hint {
  text-align: center;
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}
.click-hint.done {
  color: #43A047;
  font-weight: 600;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateX(-50%) translateY(6px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
</style>
