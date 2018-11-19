import firebase from "firebase";

// initial state
const state = {
  user: null,
  loading: false,
  error: null
};
// actions
const actions = {
  signUserIn({ commit }, payload) {
    commit("clearError");
    commit("setLoading", true);
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        commit("setLoading", false);
        const newUser = {
          id: response.user.uid,
          trackedEvents: []
        };
        commit("setUser", newUser);
      })
      .catch(error => {
        commit("setLoading", false);
        commit("setError", error);
        console.log(error);
      });
  },
  autoSignIn({ commit }, payload) {
    commit("setUser", { id: payload.uid });
  },
  logout({ commit }) {
    firebase.auth().signOut();
    commit("setUser", null);
  },
  signUserUp({ commit }, payload) {
    commit("clearError");
    commit("setLoading", true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        commit("setLoading", false);
        const newUser = {
          id: response.user.uid,
          trackedEvents: []
        };
        commit("setUser", newUser);
      })
      .catch(error => {
        commit("setLoading", false);
        commit("setError", error);
        console.log(error);
      });
  },
  clearError({ commit }) {
    commit("clearError");
  }
};
// mutations
const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  clearError(state) {
    state.error = null;
  }
};
// getters
const getters = {
  error(state) {
    return state.error;
  },
  loading(state) {
    return state.loading;
  },
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
