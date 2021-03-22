import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
require('dayjs/locale/es');
dayjs.locale('es');
dayjs.extend(relativeTime);

export function calculateAge(birthday) {
    return dayjs().from(dayjs(birthday), true);
}

export function formatDate(date) {
    return dayjs(date).format('DD - MMMM - YYYY');
}
