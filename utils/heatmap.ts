/**
 * Deterministic decorative pattern for `HeatmapGrid.vue`: no randomness, no
 * external input, no seed — same (rows, cols) always produces the same
 * output (ADR 0005, Article VII: "Randomness: none", "Third parties: none").
 * Purely cosmetic; does not represent real activity data of any kind.
 */
export const generateHeatmapPattern = (rows: number, cols: number): number[] => {
  const pattern: number[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      pattern.push((row * 3 + col * 7 + (row * col) % 5) % 5)
    }
  }
  return pattern
}
