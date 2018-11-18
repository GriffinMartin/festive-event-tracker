// initial state
const state = {
  loadedEvents: [
    {
      imageUrl:
        "https://image-ticketfly.imgix.net/00/03/05/53/91-og.png?w=650&h=919",
      id: "1324twgfd",
      title: "Black Box 2 Year",
      date: new Date(),
      location: "Denver, CO",
      description: "This is a description"
    },
    {
      imageUrl:
        "https://image-ticketfly.imgix.net/00/03/05/53/91-og.png?w=650&h=919",
      id: "234rsdfd",
      title: "Tipper NYE",
      date: new Date(),
      location: "Denver, CO",
      description: "This is another description"
    }
  ],
  user: {
    id: "gmartin",
    myEvents: ["1", "2"]
  }
};
// actions
const actions = {
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
};
// mutations
const mutations = {
  createEvent(state, payload) {
    state.loadedEvents.push(payload);
  }
};
// getters
const getters = {
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
