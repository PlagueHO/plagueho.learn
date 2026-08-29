<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <svg
    class="line-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    :aria-hidden="label ? undefined : 'true'"
    :aria-label="label || undefined"
    :role="label ? 'img' : undefined"
  >
    <template v-if="name === 'person'">
      <circle cx="12" cy="7" r="3" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </template>
    <template v-else-if="name === 'warning'">
      <path d="M12 3 2.8 20h18.4L12 3Z" />
      <path d="M12 9v5M12 17.5h.01" />
    </template>
    <template v-else-if="name === 'flow'">
      <path d="M5 7h10l-2.5-2.5M19 17H9l2.5 2.5M15 7l-2.5 2.5M9 17l2.5-2.5" />
    </template>
    <template v-else-if="name === 'layers'">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </template>
    <template v-else-if="name === 'plan'">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </template>
    <template v-else-if="name === 'shield'">
      <path d="M12 3 5 6v5c0 4.6 2.8 8.1 7 10 4.2-1.9 7-5.4 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </template>
    <template v-else-if="name === 'velocity'">
      <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" />
    </template>
    <template v-else-if="name === 'target'">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="m16 8 5-5M17 3h4v4" />
    </template>
    <template v-else-if="name === 'repeat'">
      <path d="M17 3l3 3-3 3M20 6H9a5 5 0 0 0-5 5M7 21l-3-3 3-3M4 18h11a5 5 0 0 0 5-5" />
    </template>
    <template v-else-if="name === 'terminal'">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M13 15h4" />
    </template>
    <template v-else>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 2" />
    </template>
  </svg>
</template>
