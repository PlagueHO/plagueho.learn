<template>
  <div class="al-wrapper">
    <!-- Circular ring with three phase nodes -->
    <div class="al-ring">
      <svg class="al-svg" viewBox="0 0 200 200">
        <circle class="al-track" cx="100" cy="100" r="70" />
        <circle class="al-pulse" cx="100" cy="100" r="70" />
      </svg>

      <!-- Phase nodes -->
      <div class="al-node al-reason" :class="{ active: phase === 'reason' }">
        <span>Reason</span>
      </div>
      <div class="al-node al-action" :class="{ active: phase === 'action' }">
        <span>Action</span>
      </div>
      <div class="al-node al-observe" :class="{ active: phase === 'observe' }">
        <span>Observe</span>
      </div>

      <!-- Center: goal check -->
      <div class="al-center">
        <span class="al-goal">Goal<br/>met?</span>
      </div>
    </div>

    <!-- Tool pills that fly out from Action -->
    <div class="al-tools">
      <TransitionGroup name="tool-pop">
        <span
          v-for="tool in visibleTools"
          :key="tool.name"
          class="al-tool-pill"
          :class="{ 'needs-approval': tool.approval }"
        ><span v-if="tool.approval" class="al-approval">👤</span>🔧 {{ tool.name }}</span>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const tools = [
  { name: 'get_gate_status', hiRisk: false },
  { name: 'check_crew_roster', hiRisk: false },
  { name: 'find_available_gate', hiRisk: false },
  { name: 'reassign_flight', hiRisk: true },
  { name: 'notify_passengers', hiRisk: false },
  { name: 'dispatch_maintenance', hiRisk: true },
]

const phase = ref('reason')
const phases = ['reason', 'action', 'observe']
const phaseIndex = ref(0)
const visibleTools = ref([])
const showApproval = ref(false)

let interval = null
let toolTimeout = null
let tickCount = 0

function tick () {
  phaseIndex.value = (phaseIndex.value + 1) % 3
  phase.value = phases[phaseIndex.value]

  if (phase.value === 'action') {
    tickCount++
    // Every other action cycle, include a high-risk tool that needs approval
    const needsHitl = tickCount % 2 === 0
    const shuffled = [...tools].sort(() => Math.random() - 0.5).slice(0, 3)

    // Ensure at least one hi-risk tool in approval cycles
    if (needsHitl && !shuffled.some(t => t.hiRisk)) {
      const hiRisk = tools.filter(t => t.hiRisk)
      shuffled[shuffled.length - 1] = hiRisk[Math.floor(Math.random() * hiRisk.length)]
    }

    visibleTools.value = []
    shuffled.forEach((t, i) => {
      setTimeout(() => {
        visibleTools.value = [...visibleTools.value, {
          name: t.name,
          approval: needsHitl && t.hiRisk
        }]
      }, i * 350)
    })
    // Fade them out after showing
    toolTimeout = setTimeout(() => {
      visibleTools.value = []
    }, 1800)
  }
}

onMounted(() => {
  interval = setInterval(tick, 2000)
})

onUnmounted(() => {
  clearInterval(interval)
  clearTimeout(toolTimeout)
})
</script>

<style scoped>
.al-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.15rem auto 0.3rem;
  min-height: 180px;
  transform: translateX(8px);
}

.al-ring {
  position: relative;
  width: 180px;
  height: 180px;
  flex-shrink: 0;
}

.al-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.al-track {
  fill: none;
  stroke: rgba(56, 164, 220, 0.12);
  stroke-width: 2.5;
}

.al-pulse {
  fill: none;
  stroke: rgba(56, 164, 220, 0.4);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 110 330;
  stroke-dashoffset: 0;
  animation: al-orbit 2.4s linear infinite;
}

@keyframes al-orbit {
  to { stroke-dashoffset: -440; }
}

/* Phase nodes positioned on the circle */
.al-node {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.al-node span {
  display: inline-block;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 1.02rem;
  font-weight: 600;
  color: white;
  white-space: nowrap;
  letter-spacing: 0.03em;
  min-width: 5.2rem;
  text-align: center;
}

.al-node.active {
  transform: scale(1.18);
  filter: brightness(1.2);
}

/* Reason — top-left */
.al-reason {
  top: 4px;
  left: 6px;
}
.al-reason span {
  background: linear-gradient(135deg, #4878c8, #6a96dc);
}

/* Action — right */
.al-action {
  top: 50%;
  right: -30px;
  transform: translateY(-50%);
}
.al-action.active {
  transform: translateY(-50%) scale(1.18);
}
.al-action span {
  background: linear-gradient(135deg, #b84c4c, #d06868);
}

/* Observe — bottom-left */
.al-observe {
  bottom: 4px;
  left: 6px;
}
.al-observe span {
  background: linear-gradient(135deg, #2d8e64, #4aad80);
}

/* Center goal badge */
.al-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.al-goal {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(21, 48, 71, 0.5);
  text-align: center;
  line-height: 1.3;
}

/* Tool pills area */
.al-tools {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 290px;
  margin-left: 2.2rem;
  flex-shrink: 0;
}

.al-tool-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  width: 100%;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 1.02rem;
  font-weight: 600;
  font-family: monospace;
  color: #1e40af;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.06), rgba(37, 99, 235, 0.14));
  border: 1px solid rgba(37, 99, 235, 0.15);
  white-space: nowrap;
  transition: border-color 0.3s, background 0.3s;
}

.al-tool-pill.needs-approval {
  border-color: rgba(234, 88, 12, 0.4);
  background: rgba(234, 88, 12, 0.06);
  color: #9a3412;
}

.al-approval {
  font-size: 0.84rem;
  animation: approval-pulse 0.8s ease-in-out infinite alternate;
}

@keyframes approval-pulse {
  from { opacity: 0.6; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1.1); }
}

/* Vue transition for tool pills */
.tool-pop-enter-active {
  transition: all 0.35s ease-out;
}
.tool-pop-leave-active {
  transition: all 0.5s ease-in;
}
.tool-pop-enter-from {
  opacity: 0;
  transform: translateX(-12px) scale(0.85);
}
.tool-pop-leave-to {
  opacity: 0;
  transform: translateX(8px) scale(0.9);
}
</style>
