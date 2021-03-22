import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
require('dayjs/locale/es');
dayjs.locale('es');
dayjs.extend(relativeTime);

export const calculateAge = (birthday) => dayjs().from(dayjs(birthday), true);

export const formatDate = (date) => dayjs(date).format('DD - MMMM - YYYY');
