const state = () => ({
  isLoading: false,
  userData: null,
  isLoggedin: false,
});

const getters = {
  userData: (state) => state.userData,
  isLoading: (state) => state.isLoading,
  isLoggedin: (state) => state.isLoggedin,
};

const actions = {
  async onAuthStateChangedAction({ commit, dispatch }, { authUser, claims }) {
    if (!authUser) {
      commit('SET_IS_LOGGEDIN', false)
      return
    }

    // you can request additional fields if they are optional (e.g. photoURL)
    const { uid, email, emailVerified, displayName, photoURL } = authUser

    commit('SET_USER_DATA', {
      uid,
      email,
      emailVerified,
      displayName,
      photoURL, // results in photoURL being undefined for server auth
      // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
      // isAdmin: claims.custom_claim
    })
    commit('SET_IS_LOGGEDIN', true)
  },
  googleAuth({ commit }) {
    commit('SET_IS_LOADING', true);
    var provider = new this.$fireModule.auth.GoogleAuthProvider();
    this.$fire.auth
      .signInWithPopup(provider)
      .then(() => {
        commit('SET_IS_LOADING', false);
        this.$router.replace({ path: '/' })
      }, (err) => {
        console.log(err)
        commit('SET_IS_LOADING', false);
      })
  },
  signupUser({ commit }, data) {
    commit('SET_IS_LOADING', true);
    this.$fire.auth.createUserWithEmailAndPassword(data.email, data.password).then((res) => {
      res.user.updateProfile({
        displayName: data.nickName
      }).then(() => {
        this.$fire.auth.currentUser.reload();
        // commit('SET_IS_LOGGEDIN', true);
        commit('SET_IS_LOADING', false);
        this.$router.replace({ path: '/' })
        // commit('SET_ACTIVATE_ROUTER_GUARD', false);
        console.log(res.user);
      })
    }, (err) => {
      commit('SET_IS_LOADING', false);
      console.log(err);
      this.$router.replace({ path: '/' })
    })
  },
  loginUser({ commit }, data) {
    commit('SET_IS_LOADING', true);
    this.$fire.auth.signInWithEmailAndPassword(data.email, data.password).then((res) => {
      // commit('SET_USER_DATA', res.user);
      // commit('SET_IS_LOGGEDIN', true);
      commit('SET_IS_LOADING', false);
      // commit('SET_ACTIVATE_ROUTER_GUARD', false);
      this.$router.replace({ path: '/' })
      console.log(res.user);
    }, (err) => {
      commit('SET_IS_LOADING', false);
      console.log(err);
      this.$router.replace({ path: '/' })
    })
  },
  logoutUser({ commit }) {
    commit('SET_IS_LOADING', true);
    this.$fire
      .auth.signOut().then(() => {
        // commit('SET_IS_LOGGEDIN', false);
        // commit('SET_USER_DATA', null);
        commit('SET_IS_LOADING', false);
        // commit('SET_ACTIVATE_ROUTER_GUARD', true);
        this.$router.replace({ path: '/' })
      })
      .catch(error => {
        alert(error.message);
        commit('SET_IS_LOADING', false);
        this.$router.replace({ path: '/' })
      });
  },
};

const mutations = {
  SET_IS_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SET_IS_LOGGEDIN(state, payload) {
    state.isLoggedin = payload;
  },
  SET_USER_DATA(state, payload) {
    state.userData = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};