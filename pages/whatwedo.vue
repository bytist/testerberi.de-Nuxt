<template>
    <div id="what-we-do-component" class="mb-16">
        <div class="flex justify-center items-center bg-img h-64">
            <p class="text-white font-normal title-bg">What we do</p>
        </div>
        <div class="main-content-wrapper px-3">
            <div class="container mx-auto mt-12">
                <div class="content-wrapper w-5/6 xl:w-3/4 mx-auto">
                    <p class="text-22 text-tb-black font-normal">What does Testbericht.de do?</p>
                    <p class="text-tb-black mt-3 leading-snug">
                        From the very first hour, it has always been our goal to be at the visitor's side around the clock. At Testbericht.de, we offer the consumer an overview and comparison of a wide range of products. In doing so, we try to be a good help to the consumer in making a purchase decision, to protect him from mis-purchases and, if possible, to always show the best offer.
                        <br />
                        <br />Complicated comparisons and unimportant information offer others, we want to offer our users a quick and easy overview of the desired product. The main focus is on the tests on the products. These are collected by our editorial team from a variety of sources, examined for plausibility and presented in a clear manner for the consumer. For a better overview, the most important advantages and disadvantages are directly available.
                        <br />
                        <br />In addition to the tests of a wide range of consumer magazines and test sources, the user himself is not neglected. He can independently write opinions about products and use those of other users for himself when making a purchase decision. In combination with a large amount of information about the product (data sheets, images, videos, etc.), an overall picture is thus formed for the consumer, which can effectively support him in the purchase decision.
                    </p>
                    <p class="text-22 text-tb-black font-normal mt-5">Lens and Independent</p>
                    <p
                        class="text-tb-black mt-3 leading-snug"
                    >As a service provider, we have a clear credo: we always work objectively and independently. You can be sure of Testbericht.de to get the greatest possible transparency. For this purpose, our employees work with the utmost care every day. When making a purchase decision, consumers can rely on our summaries. Avoid mis-purchases if you contact us.</p>
                    <p class="text-22 font-normal text-tb-black mt-5">Numbers & Facts</p>
                </div>
                <div class="flex justify-between items-stretch mt-12">
                    <div class="flex flex-col justify-between gap-6 items-center">
                        <div class="flex justify-center items-center h-full">
                            <img src="~/assets/images/todo-bg.svg" class="w-4/5 xl:w-full" alt />
                        </div>
                        <p class="text-tb-blue text-22 text-center">
                            Testberichte
                            <b class="ml-2">150,000</b>
                        </p>
                    </div>
                    <div class="flex flex-col justify-between gap-6 items-center">
                        <div class="flex justify-center items-center h-full">
                            <img src="~/assets/images/chat-bg.svg" class="w-4/5 xl:w-full" alt />
                        </div>
                        <p class="text-tb-blue text-22 text-center">
                            Meinungen
                            <b class="ml-2">500,000</b>
                        </p>
                    </div>
                    <div class="flex flex-col justify-between gap-6 items-center">
                        <div class="flex justify-center items-center h-full">
                            <img src="~/assets/images/thumb-bg.svg" class="w-4/5 xl:w-full" alt />
                        </div>
                        <p class="text-tb-blue text-22 text-center">
                            Angebote
                            <b class="ml-2">10m</b>
                        </p>
                    </div>
                    <div class="flex flex-col justify-between gap-6 items-center">
                        <div class="flex justify-center items-center h-full">
                            <img src="~/assets/images/shop-bg.svg" class="w-4/5 xl:w-full" alt />
                        </div>
                        <p class="text-tb-blue text-22 text-center">
                            Shops
                            <b class="ml-2">10,000+</b>
                        </p>
                    </div>
                </div>
                <p class="w-5/6 xl:w-3/4 mx-auto text-22 text-black font-normal mt-12">Meet the Team</p>
                <div class="flex justify-between items-stretch mt-12">
                    <div class="flex flex-col justify-between items-center">
                        <div class="team-photo-bg member-1 rounded-full w-40 xl:w-48 h-40 xl:h-48"></div>
                        <p class="text-22 text-tb-black font-normal text-center mt-5">Sven Dewald</p>
                        <p class="text-tb-primary-dark text-center">Owner & Head of Technology</p>
                    </div>
                    <div class="flex flex-col justify-between items-center">
                        <div class="team-photo-bg member-2 rounded-full w-40 xl:w-48 h-40 xl:h-48"></div>
                        <p class="text-22 text-tb-black font-normal text-center mt-5">Hans Fuhrmann</p>
                        <p class="text-tb-primary-dark text-center">Key Account Manager</p>
                    </div>
                    <div class="flex flex-col justify-between items-center">
                        <div class="team-photo-bg member-3 rounded-full w-40 xl:w-48 h-40 xl:h-48"></div>
                        <p class="text-22 text-tb-black font-normal text-center mt-5">Christian Ahrend</p>
                        <p class="text-tb-primary-dark text-center">Director Test Editorial</p>
                    </div>
                    <div class="flex flex-col justify-between items-center">
                        <div class="team-photo-bg member-4 rounded-full w-40 xl:w-48 h-40 xl:h-48"></div>
                        <p class="text-22 text-tb-black font-normal text-center mt-5">Wolfgang Sein</p>
                        <p class="text-tb-primary-dark text-center">Category Manager</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "WhatWeDo",
};
</script>

<style scoped>
.title-bg {
    font-size: 56px;
}
.bg-img {
    background-image: url("~/assets/images/whatwedo-bg.jpg");
    background-size: cover;
}
@media screen and (min-width: 1280px) {
    .bg-img {
        height: 400px;
    }
}
.team-photo-bg {
    background-size: cover;
}
.member-1 {
    background-image: url("~/assets/images/team/team-1.jpg");
}
.member-2 {
    background-image: url("~/assets/images/team/team-2.jpg");
}
.member-3 {
    background-image: url("~/assets/images/team/team-3.jpg");
}
.member-4 {
    background-image: url("~/assets/images/team/team-4.jpg");
}
</style>