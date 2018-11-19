import firebase from "firebase";

// initial state
const state = {
  loadedEvents: [],
  loading: false,
  error: null
};
// actions [place async code here]
const actions = {
  loadEvents({ commit }) {
    commit("setLoading", true);
    firebase
      .database()
      .ref("events")
      .once("value")
      .then(data => {
        const events = [];
        const obj = data.val();
        for (let key in obj) {
          const event = obj[key];
          events.push({
            id: key,
            title: event.title,
            description: event.description,
            imageUrl: event.imageUrl,
            date: event.date,
            location: event.location,
            creatorId: event.creatorId
          });
        }
        commit("setLoadedEvents", events);
        commit("setLoading", false);
      })
      .catch(error => {
        console.log(error);
        commit("setLoading", false);
      });
  },
  createEvent({ commit, rootState }, payload) {
    const event = {
      title: payload.title,
      location: payload.location,
      description: payload.description,
      date: payload.date.toISOString(),
      creatorId: rootState.user.user.id
    };
    let imageUrl;
    let key;
    firebase
      .database()
      .ref("events")
      .push(event)
      .then(data => {
        key = data.key;
        return key;
      })
      .then(key => {
        const filename = payload.image.name;
        const ext = filename.slice(filename.lastIndexOf("."));
        return firebase
          .storage()
          .ref("events/" + key + ext)
          .put(payload.image);
      })
      .then(fileData => {
        return fileData.ref.getDownloadURL();
      })
      .then(downloadURL => {
        imageUrl = downloadURL;
        return firebase
          .database()
          .ref("events")
          .child(key)
          .update({ imageUrl: imageUrl });
      })
      .then(() => {
        commit("createEvent", {
          ...event,
          imageUrl: imageUrl,
          id: key
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  updateEvent({ commit }, payload) {
    commit("setLoading", true);
    const updateObj = {};
    if (payload.title) {
      updateObj.title = payload.title;
    }
    if (payload.description) {
      updateObj.description = payload.description;
    }
    if (payload.date) {
      updateObj.date = payload.date;
    }
    firebase
      .database()
      .ref("events")
      .child(payload.id)
      .update(updateObj)
      .then(() => {
        commit("setLoading", false);
        commit("updateEvent", payload);
      })
      .catch(error => {
        console.log(error);
        commit("setLoading", false);
      });
  }
};
// mutations
const mutations = {
  createEvent(state, payload) {
    state.loadedEvents.push(payload);
  },
  updateEvent(state, payload) {
    const event = state.loadedEvents.find(event => {
      return event.id === payload.id;
    });
    if (payload.title) {
      event.title = payload.title;
    }
    if (payload.description) {
      event.description = payload.description;
    }
    if (payload.date) {
      event.date = payload.date;
    }
  },
  setLoadedEvents(state, payload) {
    state.loadedEvents = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  }
};
// getters
const getters = {
  featuredEvents(state, getters) {
    return getters.loadedEvents.slice(0, 5);
  },
  loadedEvent(state) {
    return eventId => {
      return state.loadedEvents.find(event => {
        return event.id === eventId;
      });
    };
  },
  loadedEvents(state) {
    return state.loadedEvents.sort((eventA, eventB) => {
      return eventA.date > eventB.date;
    });
  },
  loading(state) {
    return state.loading;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
