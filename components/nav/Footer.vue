<template>
    <div class="footer-wrapper bg-tb-dark w-full py-20 px-3">
        <div class="container mx-auto">
            <div class="footer-content flex justify-between">
                <div class="footer-row">
                    <div class="flex flex-col">
                        <NuxtLink to="/">
                            <img
                                src="../../assets/images/site-logo-white.svg"
                                alt
                                class="mb-8"
                            />
                        </NuxtLink>
                        <div class="footer-address flex items-center mb-4">
                            <div class="footer-icon-wrapper w-8">
                                <div
                                    class="fotcon-location flex justify-center transform scale-125"
                                ></div>
                            </div>
                            <span class="text-white ml-5"
                                >Adelheidstraße 13 65185 Wiesbaden</span
                            >
                        </div>
                        <div class="footer-phone flex items-center mb-4">
                            <div class="footer-icon-wrapper w-8">
                                <div
                                    class="fotcon-phone flex justify-center transform scale-125"
                                ></div>
                            </div>
                            <span class="text-white ml-5"
                                >+49 (0) 611 - 182 267 20</span
                            >
                        </div>
                        <div class="footer-mail flex items-center mb-6">
                            <div class="footer-icon-wrapper w-8">
                                <div
                                    class="fotcon-mail flex justify-center transform scale-125"
                                ></div>
                            </div>
                            <span class="text-white ml-5"
                                >info@testbericht.de</span
                            >
                        </div>
                        <div
                            class="flex justify-between border-t border-tb-semi-dark pt-8"
                        >
                            <a
                                target="_blank"
                                href="https://www.facebook.com/testbericht.de"
                            >
                                <span
                                    class="icon-footer-facebook transition duration-75 icomoon-hover-blue text-xl"
                                ></span>
                            </a>
                            <a
                                target="_blank"
                                href="https://twitter.com/testbericht_de"
                            >
                                <span
                                    class="icon-footer-twitter transition duration-75 icomoon-hover-blue text-xl"
                                ></span>
                            </a>
                            <a
                                target="_blank"
                                href="https://www.instagram.com/testbericht.de/"
                            >
                                <span
                                    class="icon-footer-instagram transition duration-75 icomoon-hover-blue text-xl"
                                ></span>
                            </a>
                            <a
                                target="_blank"
                                href="https://de.pinterest.com/testbericht/"
                            >
                                <span
                                    class="icon-footer-pinterest transition duration-75 icomoon-hover-blue text-xl"
                                ></span>
                            </a>
                            <a target="_blank" href="/">
                                <span
                                    class="icon-footer-github transition duration-75 icomoon-hover-blue text-xl"
                                ></span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="footer-row relative">
                    <p class="text-tb-blue font-normal mb-8 mt-1">
                        Believte Hersteller
                    </p>
                    <NuxtLink to="/">
                        <p class="text-white mb-1 hover:text-tb-blue">
                            Samsung
                        </p>
                    </NuxtLink>
                    <NuxtLink to="/">
                        <p class="text-white mb-1 hover:text-tb-blue">Apple</p>
                    </NuxtLink>
                    <NuxtLink to="/">
                        <p class="text-white mb-1 hover:text-tb-blue">LG</p>
                    </NuxtLink>
                    <NuxtLink to="/">
                        <p class="text-white mb-1 hover:text-tb-blue">
                            Panasonic
                        </p>
                    </NuxtLink>
                    <a
                        target="_blank"
                        href="https://play.google.com/store/apps/details?id=de.testbericht"
                    >
                        <!-- <div
                            class="img-playstore absolute bottom-0 transform origin-left scale-90 xl:scale-100"
                        ></div> -->
                        <img src="../../assets/images/google-link.png" class="absolute bottom-0 left-0 app-download google-link" alt="">
                    </a>
                </div>
                <div class="footer-row relative">
                    <p class="text-tb-blue font-normal mb-8 mt-1">
                        Testbericht.de Informationen
                    </p>
                    <NuxtLink to="/whatwedo">
                        <p class="text-white mb-1 hover:text-tb-blue">
                            Was macht Testbericht.de
                        </p>
                    </NuxtLink>
                    <NuxtLink to="/login">
                        <p class="text-white mb-1 hover:text-tb-blue">
                            Shop anmelden
                        </p>
                    </NuxtLink>
                    <NuxtLink to="/presse">
                        <p class="text-white mb-1 hover:text-tb-blue">Presse</p>
                    </NuxtLink>
                    <NuxtLink to="/career">
                        <p class="text-white mb-1 hover:text-tb-blue">
                            Karriere
                        </p>
                    </NuxtLink>
                    <NuxtLink to="/privacy">
                        <p class="text-white mb-1 hover:text-tb-blue">
                            Kooperation / Partnerbereich
                        </p>
                    </NuxtLink>
                    <a
                        target="_blank"
                        href="https://play.google.com/store/apps/details?id=de.testbericht"
                    >
                        <!-- <div
                            class="img-appstore absolute bottom-0 right-0 xl:left-0 transform origin-left scale-90 xl:scale-100"
                        ></div> -->
                        <img src="../../assets/images/apple-link.svg" class="absolute bottom-0 right-0 xl:left-0 app-download apple-link" alt="">
                    </a>
                </div>
                <div class="footer-row">
                    <p class="text-white mb-10 mt-2">
                        Immer auf dem laufenden bleiben und
                        <br />keine Deals mehr verpassen!
                    </p>
                    <div
                        v-on:click="showNewsLetterModal"
                        class="main-button cursor-pointer"
                    >
                        Newsletter Anmelden!
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <WidgetNewsModal v-if="showModal" @close="showModal = false" />
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            showModal: false,
        };
    },
    methods: {
        showNewsLetterModal: function() {
            this.showModal = true;
        },
    },
};
</script>

<style scoped>
.fade-enter-active {
    transition: 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.app-download {
    height: 50px;
    max-width: none;
}
.app-download.google-link {
    width: 167.9px;
}
@media screen and (min-width: 1280px) {
    .app-download {
        height: 55px;
    }
    .app-download.google-link {
        width: 184.68px;
    }
}
</style>
