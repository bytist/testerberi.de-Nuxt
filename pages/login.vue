<template>
  <div class="login-card-wrapper px-3">
    <div
      class="login-card mx-auto mt-12 mb-12 rounded bg-tb-primary max-w-full"
    >
      <p class="login-title text-22 text-tb-black font-normal">Login</p>
      <div class="login-card-content-wrapper flex justify-center relative">
        <div class="login-form-wrapper w-1/2 pr-16 pt-6">
          <form action="/" method="post" class="flex flex-col items-center">
            <input
              name="username"
              type="text"
              class="placeholder-tb-primary-dark login-username form-input w-full rounded-full outline-none border-transparent px-8 mb-5"
              placeholder="Username or e-mail address"
              v-model="email"
            />
            <p
              v-if="showError && !emailIsValid()"
              class="text-xs text-tb-red ml-3 w-full text-left -mt-3 mb-3"
            >
              Should be a valid Email.
            </p>
            <input
              name="password"
              type="password"
              class="placeholder-tb-primary-dark login-password form-input w-full rounded-full outline-none border-transparent px-8 mb-5"
              placeholder="Password"
              v-model="password"
            />
            <p
              v-if="showError && !password.length"
              class="text-xs text-tb-red ml-3 w-full text-left -mt-3 mb-3"
            >
              Password is required.
            </p>
            <button
              type="submit"
              @click="onFormSubmit"
              :disabled="isLoading"
              class="main-button relative overflow-hidden bg-tb-blue rounded-full w-full py-3 text-center text-lg text-white mb-4 transition duration-200 hover:bg-tb-blue-dark"
            >
              <WidgetSpinner v-if="isLoading" />
              <transition name="fade">
                <div
                  v-if="isLoading"
                  class="absolute top-0 left-0 h-full w-full bg-white opacity-50"
                ></div>
              </transition>
              Login
            </button>
            <NuxtLink to="/resetpassword" class="text-tb-blue"
              >Forgot Password</NuxtLink
            >
          </form>
        </div>
        <div
          class="social-login-wrapper flex flex-col items-center w-1/2 pl-16 border-l border-white pt-6 pb-1"
        >
          <NuxtLink
            to="/"
            class="border-2 border-tb-fb py-3 rounded-full w-full text-center text-tb-fb flex justify-center mb-4"
          >
            <span>
              <img src="~/assets/images/facebook-color.svg" alt />
            </span>
            <span class="ml-4">Sign in with Facebook</span>
          </NuxtLink>
          <div
        @click="googleAuth()"
            class="border-2 border-tb-google py-3 rounded-full w-full text-center text-tb-google flex justify-center mb-5 cursor-pointer relative overflow-hidden"
          >
            <div
              v-if="isLoading"
              class="absolute top-0 left-0 h-full w-full opacity-50"
            ></div>
            <span>
              <img src="~/assets/images/google-color.svg" alt />
            </span>
            <span class="ml-4">Sign in with Google</span>
          </div>
          <NuxtLink to="/signup" class="text-tb-blue mt-2"
            >Dont have an account? Create one</NuxtLink
          >
        </div>
        <div
          class="divider-badge absolute text-tb-primary-dark font-normal p-4 bg-tb-primary"
        >
          Or
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { emailIsValid } from "@/utils/validate";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      showError: false
    };
  },
  middleware: 'signPages',
  computed: {
    ...mapGetters("auth", ["isLoading"])
  },
  methods: {
    ...mapActions("auth", ["loginUser", "googleAuth"]),
    emailIsValid() {
      return emailIsValid(this.email);
    },
    onFormSubmit(e) {
      e.preventDefault();
      if (!this.emailIsValid() || !this.password.length) {
        this.showError = true;
      } else {
        const data = {
          email: this.email,
          password: this.password
        };
        this.loginUser(data);
      }
    }
  }
};
</script>

<style scoped>
.login-card {
  width: 930px;
  height: 384px;
  padding: 50px;
}
.login-form-wrapper input {
  padding-top: 12px;
  padding-bottom: 12px;
}
.login-form-wrapper button {
  padding-top: 11px;
  padding-bottom: 12px;
}
.divider-badge {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.fade-enter-active {
  transition: 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transition: 0.1s;
  opacity: 0;
}
</style>
