<template>
    <div
        id="answer-to-question-lightbox-component"
        class="fixed z-40 top-0 left-0 h-full w-full px-3 bg-tb-primary-dark bg-opacity-50"
    >
        <div class="relative h-full w-full flex justify-center items-center">
            <div
                class="h-full w-full absolute top-0 left-0 z-0"
                v-on:click="$emit('close')"
            ></div>
            <div
                class="lightbox-content rounded bg-tb-primary w-full max-w-5xl tb-shadow-2 p-6 xl:p-8 relative"
            >
                <div
                    v-on:click="$emit('close')"
                    class="close-btn absolute top-0 right-0 transform -translate-x-4 text-3xl text-tb-dark-red hover:text-red-800 cursor-pointer"
                >
                    &times;
                </div>
                <div class="text-22 text-tb-black font-normal">
                    Answering to:
                    <span class="text-tb-blue font-normal">{{title}}</span>
                </div>
                <textarea name="answer" id="answer" rows="8" class="form-textarea w-full rounded-5 mt-8 placeholder-tb-primary-dark resize-none px-4 xl:px-6 py-2 xl:py-4" placeholder="Meine Antwort..."></textarea>
                <div class="main-button max-w-xs mt-4">Antwort senden</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AnswerToQuestionLightbox",
    props: ["title"],
};
</script>

<style scoped>
.lightbox-wrapper {
    top: 50%;
    left: 50%;
}
.rounded-5 {
    border-radius: 20px;
}
</style>