<template>
    <div id="single-question-component">
        <div class="bg-white rounded p-3 xl:p-5">
            <p class="text-22 text-tb-blue font-normal leading-6 mb-3">
                {{ data.title }}
            </p>
            <p class="text-tb-black mt-1 leading-5 mb-3">
                {{ data.content.antwortText }}
            </p>
            <div class="flex items-center mt-1 flex-wrap gap-2 xl:gap-3">
                <span class="text-tb-primary-dark">{{
                    data.content.antwortName
                }}</span>
                <div
                    @click="likeCount++"
                    class="like flex items-center transition duration-75 cursor-pointer transform hover:scale-110"
                >
                    <svg
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17.9837 8C17.9837 6.51429 16.7863 5.3059 15.3139 5.3059H11.6609V2.6941C11.6609 1.20838 10.4635 0 8.99185 0H7.41153C6.28605 0 6.27406 1.11467 6.32127 2.13333C6.33926 2.53029 6.36024 2.976 6.33251 3.44381C5.52774 4.88229 5.0227 5.78591 4.70873 6.36724H0.561991C0.251772 6.36724 0 6.62324 0 6.93867V15.4286C0 15.744 0.251772 16 0.561991 16H15.5169C15.7387 16 15.9396 15.8674 16.031 15.661C18.153 10.8076 18.0227 10.8754 17.9837 8ZM4.21493 14.8571H1.12398V7.5101H4.21418C4.21418 7.51162 4.21493 7.5139 4.21493 7.51619V14.8571ZM15.152 14.8571H5.33891V7.59771C5.45431 7.36914 5.87468 6.57143 7.37257 3.89638C7.52318 3.62819 7.45799 2.3939 7.44375 2.07924C7.42877 1.75619 7.40929 1.32876 7.44675 1.14286H8.99185C9.84458 1.14286 10.537 1.83848 10.537 2.6941V5.8781C10.537 6.19352 10.7887 6.44952 11.0989 6.44952H15.3139C16.1666 6.44952 16.8597 7.14514 16.8597 8.0061C16.8949 10.6621 17.0261 10.5646 15.152 14.8571Z"
                            fill="#56D11C"
                        />
                    </svg>

                    <span class="text-tb-green ml-2">{{ likeCount }}</span>
                </div>
                <div
                    @click="dislikeCount++"
                    class="dislike flex items-center transition duration-75 cursor-pointer transform hover:scale-110"
                >
                    <svg
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17.9837 8C17.9837 9.48571 16.7863 10.6941 15.3139 10.6941H11.6609V13.3059C11.6609 14.7916 10.4635 16 8.99185 16H7.41153C6.28605 16 6.27406 14.8853 6.32127 13.8667C6.33926 13.4697 6.36024 13.024 6.33251 12.5562C5.52774 11.1177 5.0227 10.2141 4.70873 9.63276H0.561991C0.251772 9.63276 0 9.37676 0 9.06133L0 0.571428C0 0.256 0.251772 0 0.561991 0L15.5169 0C15.7387 0 15.9396 0.132571 16.031 0.339047C18.153 5.19238 18.0227 5.12457 17.9837 8ZM4.21493 1.14286H1.12398L1.12398 8.4899H4.21418C4.21418 8.48838 4.21493 8.4861 4.21493 8.48381L4.21493 1.14286ZM15.152 1.14286L5.33891 1.14286L5.33891 8.40229C5.45431 8.63086 5.87468 9.42857 7.37257 12.1036C7.52318 12.3718 7.45799 13.6061 7.44375 13.9208C7.42877 14.2438 7.40929 14.6712 7.44675 14.8571L8.99185 14.8571C9.84458 14.8571 10.537 14.1615 10.537 13.3059V10.1219C10.537 9.80648 10.7887 9.55048 11.0989 9.55048H15.3139C16.1666 9.55048 16.8597 8.85486 16.8597 7.9939C16.8949 5.3379 17.0261 5.43543 15.152 1.14286Z"
                            fill="#E51804"
                        />
                    </svg>

                    <span class="text-tb-dark-red ml-2">{{
                        dislikeCount
                    }}</span>
                </div>
                <div
                    v-if="data.answerCount == 0"
                    @click="openAnswerBox = true"
                    class="flex items-center transition duration-75 cursor-pointer transform hover:scale-110"
                >
                    <img
                        src="~/assets/images/comment.svg"
                        alt="Comment"
                    />
                    <span class="ml-1 text-tb-primary-dark"
                        >Antwort Schreiben</span
                    >
                </div>
                <transition name="fade">
                    <answer-to-question-lightbox
                        v-if="openAnswerBox"
                        @close="openAnswerBox = false"
                        :title="data.title"
                    />
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import AnswerToQuestionLightbox from "@/components/product/AnswerToQuestionLightbox.vue";
export default {
    name: "SingleQuestion",
    components: { AnswerToQuestionLightbox },
    data() {
        return {
            likeCount: this.data.like,
            dislikeCount: this.data.dislike,
            openAnswerBox: false,
        };
    },
    props: ["data"],
};
</script>

<style scoped>
.like:hover svg path {
    fill: #48b415;
}
.like:hover span {
    color: #48b415;
}
.dislike:hover svg path {
    fill: #c72222;
}
.dislike:hover span {
    color: #c72222;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>