export interface Personal {
  name: string
  surname: string
  short_name: string
  gender: string
  activities: string[]
  birthday: string
  /** Start of paid programming work (Visual Basic, then PHP) — pre-2010 Fortran/Matlab/Maple/Octave/Derive coursework doesn't count. */
  professional_since: string
}

const personal: Personal = {
  name: 'José Rafael',
  surname: 'Gutierrez Blanco',
  short_name: 'José R. Gutierrez',
  gender: 'Masculino',
  activities: ['Desarrollador Web', 'Diseñador UI/UX', 'Matemático', 'Freelancer'],
  birthday: '1981-10-05',
  professional_since: '2010-01-01',
}

export default personal
