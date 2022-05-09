import certifications from '@/data/certifications';

export default {
    namespaced: true,
    state: () => ({
        certifications: certifications.sort((a, b) => {
            if (a.caption > b.caption) {
                return 1;
            }
            if (a.caption < b.caption) {
                return -1;
            }
            return 0;
        }),
    }),
}
