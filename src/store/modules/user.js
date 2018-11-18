import firebase from "firebase";

// initial state
const state = {
  user: null
};
// actions
const actions = {
  signUserIn({ commit }, payload) {
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        const newUser = {
          id: response.user.uid,
          trackedEvents: []
        };
        commit("setUser", newUser);
      })
      .catch(error => {
        console.log(error);
      });
  },
  signUserUp({ commit }, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        const newUser = {
          id: response.user.uid,
          trackedEvents: []
        };
        commit("setUser", newUser);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
// mutations
const mutations = {
  setUser(state, payload) {
    state.user = payload;
  }
};
// getters
const getters = {
  user(state) {
    return state.user;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
