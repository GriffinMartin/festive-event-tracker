import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedEvents: [
      {
        imageUrl: "www.image.com",
        id: "1",
        title: "Black Box 2 Year",
        date: "2018-7-18",
        location: "Denver, CO",
        description: null
      },
      {
        imageUrl: "www.test.com",
        id: "2",
        title: "Tipper NYE",
        date: "2018-7-19",
        location: "Denver, CO",
        description: null
      }
    ],
    user: {
      id: "gmartin",
      myEvents: ["1", "2"]
    }
  },
  mutations: {
    createEvent(state, payload) {
      state.loadedEvents.push(payload);
    }
  },
  actions: {
    createEvent({ commit }, payload) {
      const event = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: "kfdlsfjslakl12"
      };
      // TODO Reach out to firebase and store it
      commit("createEvent", event);
    }
  },
  getters: {
    loadedEvents(state) {
      return state.loadedEvents.sort((eventA, eventB) => {
        return eventA.date > eventB.date;
      });
    },
    featuredEvents(state, getters) {
      return getters.loadedEvents.slice(0, 5);
    },
    loadedEvent(state) {
      return eventId => {
        return state.loadedEvents.find(event => {
          return event.id === eventId;
        });
      };
    }
  }
});
