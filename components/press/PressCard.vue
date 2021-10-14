<template>
    <div id="press-card-component" class="relative">
        <NuxtLink
            :to="{path: data.link}"
            class="absolute h-full w-full top-0 left-0 hover:border border-tb-blue hover:tb-shadow-3 rounded transition duration-100"
        ></NuxtLink>
        <div class="rounded bg-tb-primary overflow-hidden">
            <div
                :style="'background-image:url(' + data.bildURL + ');'"
                class="img-wrapper bg-cover h-48 xl:h-56"
            ></div>
            <div class="p-2 xl:p-6 mt-3">
                <p class="text-22 font-normal text-tb-black">{{data.ueberschrift}}</p>
                <p class="text-tb-black leading-snug mt-3">{{data.teaser}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PressCard",
    props: ["data"],
};
</script>