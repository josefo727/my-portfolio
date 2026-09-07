import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const LOGOS = [
  'filament',
  'livewire',
  'postgresql',
  'python',
  'flutter',
  'dart',
  'typescript',
  'tailwindcss',
  'sdd-tdd',
]

describe('public/assets/img/logos — new skill icons', () => {
  it.each(LOGOS)('%s.svg exists', (name) => {
    expect(existsSync(resolve(process.cwd(), `public/assets/img/logos/${name}.svg`))).toBe(true)
  })
})
