<template>
  <div class="heatmap" aria-hidden="true">
    <span
      v-for="(intensity, index) in cells"
      :key="index"
      class="heatmap__cell"
      :class="`heatmap__cell--level-${intensity}`"
      :style="{ '--i': index }"
    />
  </div>
</template>

<script setup lang="ts">
import { generateHeatmapPattern } from '~/utils/heatmap'

const ROWS = 7
const COLS = 36

const cells = generateHeatmapPattern(ROWS, COLS)
</script>

<style scoped>
.heatmap {
  display: grid;
  grid-template-columns: repeat(v-bind(COLS), 1fr);
  gap: 3px;
}

.heatmap__cell {
  aspect-ratio: 1;
  border-radius: 2px;
  animation: heatmap-pulse 3s ease-in-out infinite;
  animation-delay: calc(var(--i) * 40ms);
}

.heatmap__cell--level-0 {
  background-color: #ebedf0;
}

.heatmap__cell--level-1 {
  background-color: #9be9a8;
}

.heatmap__cell--level-2 {
  background-color: #40c463;
}

.heatmap__cell--level-3 {
  background-color: #30a14e;
}

.heatmap__cell--level-4 {
  background-color: #216e39;
}

@keyframes heatmap-pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}
</style>
