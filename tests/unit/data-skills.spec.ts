import { describe, expect, it } from 'vitest'
import skills from '../../data/skills'

const ORIGINAL_TITLES = [
  'HTML 5',
  'CSS',
  'PHP',
  'Laravel',
  'JavaScript',
  'VueJS',
  'NuxtJS',
  'ReactJS',
  'NodeJS',
  'NestJS',
  'API REST',
  'Vtex',
  "Motores SQL's",
  "Motores NoSQL's",
  'DevOps',
  'Docker',
]

const NEW_SKILLS = [
  { title: 'SDD/TDD', image: '/assets/img/logos/sdd-tdd.svg' },
  { title: 'Filament', image: '/assets/img/logos/filament.svg' },
  { title: 'Livewire', image: '/assets/img/logos/livewire.svg' },
  { title: 'PostgreSQL', image: '/assets/img/logos/postgresql.svg' },
  { title: 'Python', image: '/assets/img/logos/python.svg' },
  { title: 'Flutter/Dart', image: '/assets/img/logos/flutter.svg' },
  { title: 'TypeScript', image: '/assets/img/logos/typescript.svg' },
  { title: 'Tailwind CSS', image: '/assets/img/logos/tailwindcss.svg' },
]

describe('data/skills', () => {
  it('has the original 16 entries unchanged, plus 8 new ones (24 total), no duplicates', () => {
    expect(skills).toHaveLength(24)

    expect(skills[0]).toEqual({ title: 'HTML 5', image: '/assets/img/logos/html-5.png' })
    for (const title of ORIGINAL_TITLES) {
      expect(skills.some((s) => s.title === title)).toBe(true)
    }

    for (const newSkill of NEW_SKILLS) {
      expect(skills).toContainEqual(newSkill)
    }

    const titles = skills.map((s) => s.title)
    expect(new Set(titles).size).toBe(titles.length)

    for (const skill of skills) {
      expect(typeof skill.title).toBe('string')
      expect(typeof skill.image).toBe('string')
      expect(skill.image.length).toBeGreaterThan(0)
    }
  })
})
