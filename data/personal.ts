export interface Personal {
  name: string
  surname: string
  short_name: string
  gender: string
  activities: string[]
  birthday: string
}

const personal: Personal = {
  name: 'José Rafael',
  surname: 'Gutierrez Blanco',
  short_name: 'José R. Gutierrez',
  gender: 'Masculino',
  activities: ['Desarrollador Web', 'Diseñador UI/UX', 'Matemático', 'Freelancer'],
  birthday: '1981-10-05',
}

export default personal
