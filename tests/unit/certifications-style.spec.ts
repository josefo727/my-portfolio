import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const page = readFileSync(resolve(process.cwd(), 'pages/certifications.vue'), 'utf-8')
const card = readFileSync(
  resolve(process.cwd(), 'components/certifications/CertificationCard.vue'),
  'utf-8',
)

describe('certifications — styling', () => {
  it('the page lays certification cards out in a grid', () => {
    expect(page).toMatch(/display:\s*grid/)
  })

  it('CertificationCard spaces its image/caption with the spacing scale', () => {
    expect(card).toMatch(/var\(--space-/)
  })
})
