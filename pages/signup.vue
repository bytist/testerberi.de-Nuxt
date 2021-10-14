<template>
  <div class="signup-card-wrapper px-3">
    <div
      class="signup-card mx-auto mt-12 mb-12 rounded bg-tb-primary pt-12 max-w-full"
    >
      <p class="signup-title text-22 text-tb-black font-normal mb-4">
        Dont have an account?
      </p>
      <div class="flex justify-between mb-5 leading-relaxed">
        <ul class="w-5/12 list-disc text-tb-primary-dark pl-4">
          <li>Keine Eingabe von Captchern mehr notwändig</li>
          <li>
            Überprüfung der Mailadresse bei Preisalarm oder Newsletter entfällt
          </li>
          <li>Übersicht aller geschriebenen Meinungen</li>
        </ul>
        <ul class="w-5/12 list-disc text-tb-primary-dark">
          <li>Einfache Verwaltung ihrer Newsletter</li>
          <li>Stellen oder beantworten Sie Fragen</li>
          <li>Verwalten mehrerer Merklisten</li>
          <li>Ansehen deiner Merkzettel auf mehreren Geräten</li>
        </ul>
      </div>
      <form action="/" method="post">
        <p class="text-tb-black mb-5">
          Um ein Benutzerkonto für Dich anlegen zu können, benötigen wir die
          folgenden Daten:
        </p>
        <div class="flex justify-between flex-wrap">
          <input
            name="username"
            type="text"
            class="form-item placeholder-tb-primary-dark signup-username rounded-full px-8 mb-5 form-input border-transparent"
            placeholder="Nickname"
            v-model="nickName"
          />
          <input
            name="email"
            type="email"
            class="form-item placeholder-tb-primary-dark signup-email rounded-full px-8 mb-5 form-input border-transparent"
            placeholder="E-mail Adresse"
            v-model="email"
          />
          <div class="w-full flex justify-between -mt-3 mb-3 ml-3">
            <div class="form-item">
              <p
                v-if="showError && !nickName.length"
                class="text-xs text-tb-red leading-none"
              >
                Nick name is required.
              </p>
            </div>
            <div class="form-item">
              <p
                v-if="showError && !emailIsValid()"
                class="text-xs text-tb-red leading-none"
              >
                Should be a valid email.
              </p>
            </div>
          </div>
          <input
            name="password"
            type="password"
            class="form-item placeholder-tb-primary-dark signup-password rounded-full px-8 mb-5 form-input border-transparent"
            placeholder="Passwort"
            v-model="password"
          />
          <input
            name="repassword"
            type="password"
            class="form-item placeholder-tb-primary-dark signup-repassword rounded-full px-8 mb-5 form-input border-transparent"
            placeholder="Passwort Weiderholen"
            v-model="repPassword"
          />
          <div class="w-full flex justify-between -mt-3 mb-3 ml-3">
            <div class="form-item">
              <p
                v-if="showError && !password.length"
                class="text-xs text-tb-red leading-none"
              >
                Password is required.
              </p>
            </div>
            <div class="form-item">
              <p
                v-if="showError && repPassword != password"
                class="text-xs text-tb-red leading-none"
              >
                Password doesn't match.
              </p>
            </div>
          </div>
          <div class="form-item flex pt-1">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              class="w-4 h-4 form-checkbox rounded-full border-transparent mt-1"
              v-model="isTermAgreed"
            />
            <label
              for="agree"
              class="ml-3 leading-5"
              :class="
                showError && !isTermAgreed ? 'text-tb-red' : 'text-tb-black'
              "
            >
              ch habe die Datenschutzerklärung gelesen und stimme den
              Nutzungsbedingungen zu.
            </label>
          </div>
          <button
            type="submit"
            @click="onFormSubmit"
            :disabled="isLoading"
            class="main-button relative overflow-hidden form-item bg-tb-blue rounded-full py-3 text-center text-lg text-white transition duration-200 hover:bg-tb-blue-dark"
          >
            <transition name="fade">
              <div
                v-if="isLoading"
                class="absolute top-0 left-0 h-full w-full bg-white opacity-50"
              ></div>
            </transition>
            Benutzerkonto erstellen
          </button>
        </div>
      </form>
      <div
        class="social-signup-wrapper flex justify-between mt-16 pt-10 border-t border-white relative"
      >
        <NuxtLink
          to="/"
          class="form-item border-2 border-tb-fb py-3 rounded-full text-center text-tb-fb flex justify-center"
        >
          <span>
            <img src="~/assets/images/facebook-color.svg" alt />
          </span>
          <span class="ml-4">Sign in with Facebook</span>
        </NuxtLink>
        <div
        @click="googleAuth()"
          class="form-item border-2 border-tb-google py-3 rounded-full text-center text-tb-google flex justify-center cursor-pointer relative overflow-hidden"
        >
        <div v-if="isLoading" class="absolute top-0 left-0 h-full w-full opacity-50"></div>
          <span>
            <img src="~/assets/images/google-color.svg" alt />
          </span>
          <span class="ml-4">Sign in with Google</span>
        </div>
        <div
          class="divider-badge absolute text-tb-primary-dark font-normal px-6 bg-tb-primary"
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
  name: "Signup",
  middleware: 'signPages',
  data() {
    return {
      email: "",
      password: "",
      repPassword: "",
      nickName: "",
      isTermAgreed: false,
      showError: false
    };
  },
  computed: {
    ...mapGetters("auth", ["isLoading"])
  },
  methods: {
    ...mapActions("auth", ["signupUser", "googleAuth"]),
    emailIsValid() {
      return emailIsValid(this.email);
    },
    onFormSubmit(e) {
      e.preventDefault();
      if (
        !this.emailIsValid() ||
        !this.password.length ||
        !this.repPassword == this.password ||
        !this.nickName.length ||
        !this.isTermAgreed
      ) {
        this.showError = true;
      } else {
        const data = {
          email: this.email,
          password: this.password,
          nickName: this.nickName
        };
        this.signupUser(data);
      }
    }
  }
};
</script>

<style scoped>
.signup-card {
  width: 930px;
  padding: 50px;
}
.form-item {
  width: 48%;
}
input.form-item {
  padding-top: 12px;
  padding-bottom: 12px;
}
button.form-item {
  padding-top: 11px;
  padding-bottom: 12px;
}
.divider-badge {
  top: 0%;
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
