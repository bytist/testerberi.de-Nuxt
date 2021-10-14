<template>
    <div id="career-component" class="mb-12">
        <div class="flex justify-center items-center bg-img h-64">
            <p class="text-white font-normal title-bg">Career</p>
        </div>
        <div class="px-3 mt-12">
            <div class="container mx-auto">
                <div class="flex justify-between gap-2 xl:gap-6">
                    <div class="w-full">
                        <p
                            class="text-22 font-normal text-tb-black"
                        >Softwareentwickler Vollzeit (m/w/d)</p>
                        <p class="text-tb-black mt-4 leading-snug">
                            Softwareentwickler Vollzeit (m/w/d)
                            <br />Du bastelst gerne an Webseiten, es macht Dir Spass Dich durch Code zu wühlen und neuen zu verfassen? Du sprichst fließend PHP, HTML, CSS, etc.?
                            <br />Dann bist du jetzt genau richtig!
                            <br />Du arbeitest in einem kleinen dynamischen Team und betreust größere bestehende Projekte oder entwickelst Neue und entscheidest aktiv den weiteren Fortgang mit.
                            <br />
                            <br />
                            <b>Deine Aufgaben:</b>
                            <br />
                            <span class="text-tb-primary-dark">
                                - Betreuung bestehender Projekte (Desktop / Mobil)
                                <br />- Planung und Enwicklung neuer Projekte (Desktop / Mobil)
                            </span>
                            <br />
                            <br />
                            <b>Deine Qualifikation:</b>
                            <br />
                            <span class="text-tb-primary-dark">
                                - PHP, HTML, CSS, JS
                                <br />- Englisch (lesend, optional auch schreibend und sprechend)
                                <br />- Android / IOS (optional)
                            </span>
                            <br />
                            <br />
                            <b>Wir bieten:</b>
                            <br />
                            <span class="text-tb-primary-dark">
                                - kleine Teams zur individuellen Entfaltung des Einzelnen
                                <br />- flexible Arbeitszeiten (Hauptsache die Arbeit wird erledigt)
                                <br />- Spass bei der Arbeit und viele nette Kollegen
                            </span>
                            <br />
                            <br />Sende deine Bewerbung in digitaler Form an
                            <a
                                href="mailto:bewerbung@testbericht.de"
                                class="underline text-tb-blue"
                            >bewerbung@testbericht.de</a>
                        </p>
                    </div>
                    <div class="w-full">
                        <p
                            class="text-22 font-normal text-tb-black"
                        >Online-Redakteur Praktikum/Teilzeit (m/w/d)</p>
                        <p class="text-tb-black mt-4 leading-snug">
                            Du interessierst dich für Themengebiete im Bereich Online-Redaktion, liest und schreibst gerne?
                            <br />Bei uns kannst du den Alltag eines Online-Readakteurs hautnah miterleben. Von der Recherche bis zu selbstständigen verfassen von Texten für verschiedene Themenbereiche.
                            <br />
                            <br />
                            <b>Deine Aufgaben:</b>
                            <br />
                            <span class="text-tb-primary-dark">
                                - Erfassen von Texten für unser Online-Portal
                                <br />- Zusammenfassen größerer Artikel
                                <br />- Erstellen eigener Artikel
                            </span>
                            <br />
                            <br />
                            <b>Deine Qualifikation:</b>
                            <br />
                            <span class="text-tb-primary-dark">
                                - Interesse am Beruf des Redakteurs
                                <br />- Gute Deutschkenntnisse (Rechtschreibung, Grammatik)
                                <br />- Große Begeisterung neue Sachen zu lernen
                            </span>
                            <br />
                            <br />
                            <b>Wir bieten:</b>
                            <br />
                            <span class="text-tb-primary-dark">
                                - Viele nette Kollegen
                                <br />- Viel Spass bei der Arbeit
                                <br />- Arbeit an aufregenden und spannenden Themen
                            </span>
                            <br />
                            <br />Sende deine Bewerbung in digitaler Form an
                            <a
                                href="mailto:bewerbung@testbericht.de"
                                class="text-tb-blue underline"
                            >bewerbung@testbericht.de</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Career",
};
</script>

<style scoped>
.title-bg {
    font-size: 56px;
}
.bg-img {
    background-image: url("~/assets/images/career-bg.jpg");
    background-size: cover;
}
@media screen and (min-width: 1280px) {
    .bg-img {
        height: 400px;
    }
}
</style>