import facts from '@/data/facts';

export default {
    namespaced: true,
    state: () => ({
        facts: facts,
    }),
}
