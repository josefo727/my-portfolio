import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'

dayjs.extend(relativeTime)
dayjs.locale('es')

export const calculateAge = (birthday: string): string => dayjs().from(dayjs(birthday), true)

export const formatDate = (date: string): string => dayjs(date).format('DD - MMMM - YYYY')
