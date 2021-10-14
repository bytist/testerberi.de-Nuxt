<template>
    <div class="newsletter-modal-wrapper fixed top-0 left-0 h-full w-full z-40">
        <div class="modal-content h-full w-full relative flex justify-center items-center">
            <div
                v-on:click="$emit('close')"
                class="absolute h-full w-full top-0 left-0 opacity-50 bg-tb-primary-dark"
            ></div>
            <div
                class="modal-card rounded bg-tb-primary mx-auto relative tb-shadow-2 lightbox-item"
            >
                <form action="/" method="post">
                    <p
                        class="newsletter-title text-22 text-tb-black font-normal uppercase mb-1"
                    >NEWSLETTER ABONNIEREN</p>
                    <p class="text-tb-primary-dark mb-4">
                        Abonniere unseren individuellen kostenlosen
                        Testbericht.de-Newsletter und verpasse keinen wichtigen
                        Test mehr.
                    </p>
                    <div class="flex items-center mb-5">
                        <input
                            type="radio"
                            name="sex"
                            id="male"
                            value="0"
                            class="radio-input h-4 w-4 form-radio border-transparent"
                            checked
                        />
                        <span class="text-tb-black ml-2">Herr</span>
                        <input
                            type="radio"
                            name="sex"
                            id="female"
                            value="1"
                            class="radio-input h-4 w-4 form-radio border-transparent ml-5"
                        />
                        <span class="text-tb-black ml-2">Frau</span>
                    </div>
                    <div class="flex justify-between flex-wrap">
                        <input
                            type="text"
                            name="name"
                            class="form-item placeholder-tb-primary-dark newsletter-field rounded-full px-8 mb-5 form-input border-transparent"
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            name="lastname"
                            class="form-item placeholder-tb-primary-dark newsletter-field rounded-full px-8 mb-5 form-input border-transparent"
                            placeholder="Last name"
                        />
                        <input
                            type="text"
                            name="email"
                            class="w-full placeholder-tb-primary-dark newsletter-field rounded-full px-8 mb-5 form-input border-transparent"
                            placeholder="E-mail address"
                        />
                    </div>
                    <div class="flex items-center mb-3">
                        <img src="../../assets/images/check.svg" class="-mt-px" alt="">
                        <span class="ml-2 capitalize text-tb-black">Allgemeiner Newsletter</span>
                    </div>
                    <div class="flex mb-8 items-start">
                        <img src="../../assets/images/check.svg" class="-mt-px" alt="">
                        <span class="text-xs text-tb-primary-dark ml-2">
                            Ich willige ein, dass mich Testbericht.de per eMail
                            über die oben ausgewählte Daten informiert. Meine
                            Daten werden ausschließlich zu diesem Zweck genutzt.
                            Eine Weitergabe an Dritte erfolgt nicht. Ich kann
                            die Einwilligung jederzeit mit den in der
                            Datenschutzerklärung genannten Kontaktmöglichkeiten
                            oder durch Nutzung des in den eMails enthaltenen
                            Abmeldelinks widerrufen.
                        </span>
                    </div>
                    <button type="submit" class="main-button w-full uppercase">NEWSLETTER ABONNIEREN</button>
                </form>
                <div
                    v-on:click="$emit('close')"
                    class="close-btn absolute top-0 right-0 transform -translate-x-4 text-3xl text-tb-dark-red hover:text-red-800 cursor-pointer"
                >&times;</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "NewsModal",
    props: ["showStat"],
    mounted() {
                document.getElementsByTagName("BODY")[0].classList.add('overflow-hidden-i');
    },
    beforeDestroy() {
                document.getElementsByTagName("BODY")[0].classList.remove('overflow-hidden-i');
    },
};
</script>

<style scoped>
.light-box {
    width: 690px;
}
.modal-card {
    width: 690px;
    padding: 36px 44px 41px;
}
.form-item {
    width: 48%;
}
input.newsletter-field {
    padding-top: 12px;
    padding-bottom: 12px;
}
</style>
