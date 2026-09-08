import { describe, expect, it } from 'vitest'
import personal from '../../data/personal'
import location from '../../data/location'
import contact from '../../data/contact'
import facts from '../../data/facts'

describe('data/personal', () => {
  it('matches the ported src/data/personal.js content', () => {
    expect(personal).toEqual({
      name: 'José Rafael',
      surname: 'Gutierrez Blanco',
      short_name: 'José R. Gutierrez',
      gender: 'Masculino',
      activities: ['Desarrollador Web', 'Diseñador UI/UX', 'Matemático', 'Freelancer'],
      birthday: '1981-10-05',
    })
  })
})

describe('data/location', () => {
  it('matches the ported src/data/location.js content', () => {
    expect(location).toEqual({
      address: 'Carrera 81D #16-19',
      residency: 'Barrio Andalucía',
      home: 'Piso 2, Apto 201',
      city: 'Kennedy',
      department: 'Bogotá DC',
      country: 'Colombia',
      longitude: '4.6546793',
      latitude: '-74.1402691',
    })
  })
})

describe('data/contact', () => {
  it('matches the current contact details (X handle, GitHub added, Skype removed)', () => {
    expect(contact).toEqual({
      email: 'josefo727@gmail.com',
      web_site: 'https://jose-gutierrez.com',
      facebook: 'https://www.facebook.com/joserafael.gutierrezblanco',
      x: 'https://x.com/josefo727',
      github: 'https://github.com/josefo727',
      linkedin: 'https://www.linkedin.com/in/jose-gutierrez-5a2293128/',
      instagram: 'https://www.instagram.com/josefo1981/',
      phone: '+576018394169',
      mobil: '+573026178155',
    })
  })
})

describe('data/facts', () => {
  it('has the same 4 entries as the ported src/data/facts.js', () => {
    expect(facts).toHaveLength(4)
    expect(facts.map((f) => f.title)).toEqual([
      'Clientes felices',
      'Proy. completados',
      'Horas de soporte',
      'Proy. complejos',
    ])
    for (const fact of facts) {
      expect(fact).toHaveProperty('icon')
      expect(fact).toHaveProperty('quantity')
      expect(fact).toHaveProperty('title')
      expect(fact).toHaveProperty('sub_title')
    }
  })
})
