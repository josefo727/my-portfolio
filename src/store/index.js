import Vue from 'vue';
import Vuex from 'vuex';
import personal from '@/store/personal';
import contact from '@/store/contact';
import location from '@/store/location';
import facts from '@/store/facts';
import skills from '@/store/skills';
import education from '@/store/education';
import experience from '@/store/experience';
import successStories from '@/store/success-stories';
import certifications from "@/store/certifications";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    personal,
    contact,
    location,
    facts,
    skills,
    education,
    experience,
    successStories,
    certifications,
  }
});
