import certifications from '@/data/certifications';

export default {
    namespaced: true,
    state: () => ({
        certifications: certifications,
    }),
}
