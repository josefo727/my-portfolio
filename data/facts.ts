export interface Fact {
  icon: string
  quantity: number
  title: string
  sub_title: string
}

const facts: Fact[] = [
  {
    icon: 'icofont-simple-smile',
    quantity: 65,
    title: 'Clientes felices',
    sub_title: 'y contentos con el resultado.',
  },
  {
    icon: 'icofont-document-folder',
    quantity: 95,
    title: 'Proy. completados',
    sub_title: 'y entregados satisfactoriamente.',
  },
  {
    icon: 'icofont-live-support',
    quantity: 1500,
    title: 'Horas de soporte',
    sub_title: 'antes y después de desarrollo.',
  },
  {
    icon: 'icofont-users-alt-5',
    quantity: 30,
    title: 'Proy. complejos',
    sub_title: 'de mucha demanda y duro trabajo.',
  },
]

export default facts
