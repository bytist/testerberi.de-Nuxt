<template>
    <div id="product-detail-small-component">
        <div class="flex justify-between gap-2 xl:gap-6">
            <div class="w-full">
                <div class="flex py-3 border-b gap-2 border-tb-border">
                    <div class="w-1/2 xl:w-2/5 text-tb-primary-dark">Produkttyp</div>
                    <div class="w-full">
                        <span
                            v-for="(item, index) in data.type"
                            :key="index"
                            class="text-tb-black font-normal"
                        >{{index > 0 ? ', ' : ''}}{{item}}</span>
                    </div>
                </div>
                <div class="flex py-3 border-b gap-2 border-tb-border">
                    <div class="w-1/2 xl:w-2/5 text-tb-primary-dark">Farbe</div>
                    <div class="w-full">
                        <span class="text-tb-black font-normal">{{data.color}}</span>
                    </div>
                </div>
                <div class="flex py-3 border-b gap-2 border-tb-border">
                    <div class="w-1/2 xl:w-2/5 text-tb-primary-dark">Features</div>
                    <div class="w-full">
                        <span
                            v-for="(item, index) in data.features"
                            :key="index"
                            class="text-tb-black font-normal"
                        >{{index > 0 ? ', ' : ''}}{{item}}</span>
                    </div>
                </div>
                <div class="flex py-3 border-b gap-2 border-tb-border">
                    <div class="w-1/2 xl:w-2/5 text-tb-primary-dark">mobile Datenkommunikation</div>
                    <div class="w-full">
                        <span
                            v-for="(item, index) in data.dataCommunication"
                            :key="index"
                            class="text-tb-black font-normal"
                        >{{index > 0 ? ', ' : ''}}{{item}}</span>
                    </div>
                </div>
                <div class="flex py-3 border-b gap-2 border-tb-border">
                    <div class="w-1/2 xl:w-2/5 text-tb-primary-dark">Outdoor-Funktion</div>
                    <div class="w-full">
                        <span class="text-tb-black font-normal">{{data.outdoorFunction}}</span>
                    </div>
                </div>
                <div class="flex py-3 border-b gap-2 border-tb-border">
                    <div class="w-1/2 xl:w-2/5 text-tb-primary-dark">Display-Auflösung</div>
                    <div class="w-full">
                        <span
                            class="text-tb-black font-normal"
                        >{{data.displayResolution.width}} x {{data.displayResolution.height}} Pixel / {{data.displayResolution.type}}</span>
                    </div>
                </div>
                <div class="flex py-3 border-b gap-2 border-tb-border">
                    <div class="w-1/2 xl:w-2/5 text-tb-primary-dark">Bauart</div>
                    <div class="w-full">
                        <span class="text-tb-black font-normal">{{data.designType}}</span>
                    </div>
                </div>
                <div class="flex py-3 gap-2">
                    <div class="w-1/2 xl:w-2/5 text-tb-primary-dark">Barrierefreiheit</div>
                    <div class="w-full">
                        <span class="text-tb-black font-normal">{{data.accessibility}}</span>
                    </div>
                </div>
            </div>
            <div class="w-full">
                <div class="flex py-3 border-b gap-2 border-tb-border">
                    <div class="w-1/2 xl:w-2/5 text-tb-primary-dark">Gehäusematerial</div>
                    <div class="w-full">
                        <span
                            v-for="(item, index) in data.housingMaterial"
                            :key="index"
                            class="text-tb-black font-normal"
                        >{{index > 0 ? ', ' : ''}}{{item}}</span>
                    </div>
                </div>
                <div class="flex py-3 border-b gap-2 border-tb-border">
                    <div class="w-1/2 xl:w-2/5 text-tb-primary-dark">Schutzart</div>
                    <div class="w-full">
                        <span class="text-tb-black font-normal">{{data.protection}}</span>
                    </div>
                </div>
                <div class="flex py-3 border-b gap-2 border-tb-border">
                    <div class="w-1/2 xl:w-2/5 text-tb-primary-dark">Serie</div>
                    <div class="w-full">
                        <span class="text-tb-black font-normal">{{data.serie}}</span>
                    </div>
                </div>
                <div class="flex py-3 border-b gap-2 border-tb-border">
                    <div class="w-1/2 xl:w-2/5 text-tb-primary-dark">Smartphone Klasse</div>
                    <div class="w-full">
                        <span class="text-tb-black font-normal">{{data.smartphoneClass}}</span>
                    </div>
                </div>
                <div class="flex py-3 border-b gap-2 border-tb-border">
                    <div class="w-1/2 xl:w-2/5 text-tb-primary-dark">Produkt-Besonderheiten</div>
                    <div class="w-full">
                        <span class="text-tb-black font-normal">{{data.productSpecifics}}</span>
                    </div>
                </div>
                <div class="flex py-3 border-b gap-2 border-tb-border">
                    <div class="w-1/2 xl:w-2/5 text-tb-primary-dark">Display-Besonderheiten</div>
                    <div class="w-full">
                        <span
                            v-for="(item, index) in data.displayFeatures"
                            :key="index"
                            class="text-tb-black font-normal"
                        >{{index > 0 ? ', ' : ''}}{{item}}</span>
                    </div>
                </div>
                <div class="flex py-3 gap-2">
                    <div class="w-1/2 xl:w-2/5 text-tb-primary-dark">Display-Seitenverhältnis</div>
                    <div class="w-full">
                        <span
                            class="text-tb-black font-normal"
                        >{{data.displayRatio.horizon}}:{{data.displayRatio.vertical}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProductDetailSmall",
    props: ["data"],
};
</script>

<style>
</style>