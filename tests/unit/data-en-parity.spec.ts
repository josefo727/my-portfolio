import { describe, expect, it } from 'vitest'
import personalEs from '../../data/personal'
import personalEn from '../../data/personal.en'
import factsEs from '../../data/facts'
import factsEn from '../../data/facts.en'
import skillsEs from '../../data/skills'
import skillsEn from '../../data/skills.en'
import educationEs from '../../data/education'
import educationEn from '../../data/education.en'
import certificationsEs from '../../data/certifications'
import certificationsEn from '../../data/certifications.en'
import experienceEs from '../../data/experience'
import experienceEn from '../../data/experience.en'
import successStoriesEs from '../../data/success-stories'
import successStoriesEn from '../../data/success-stories.en'

describe('data/*.en.ts — parity with the Spanish source', () => {
  it('personal.en has the same activities count as personal', () => {
    expect(personalEn.activities).toHaveLength(personalEs.activities.length)
  })

  it('facts.en has the same length as facts', () => {
    expect(factsEn).toHaveLength(factsEs.length)
  })

  it('skills.en has the same length as skills', () => {
    expect(skillsEn).toHaveLength(skillsEs.length)
  })

  it('education.en has the same length as education', () => {
    expect(educationEn).toHaveLength(educationEs.length)
  })

  it('certifications.en has the same length as certifications', () => {
    expect(certificationsEn).toHaveLength(certificationsEs.length)
  })

  it('experience.en has the same length as experience', () => {
    expect(experienceEn).toHaveLength(experienceEs.length)
  })

  it('success-stories.en has the same length as success-stories', () => {
    expect(successStoriesEn).toHaveLength(successStoriesEs.length)
  })
})
