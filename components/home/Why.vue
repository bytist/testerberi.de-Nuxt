<template>
	<div class="home-why-wrapper container mx-auto flex justify-between">
		<div class="home-why-content">
			<div class="home-why-image-wrapper pt-12 pb-3">
				<img
					src="~/assets/images/home/why-1.svg"
					class="h-40 transition transform duration-1000 hover:-translate-y-1"
					alt
				/>
			</div>
			<p
				class="text-tb-black home-why-title text-22 font-normal mb-2"
			>Testberichte zu Produkten jeder Art</p>
			<div class="home-why-desc-wrapper px-1">
				<p class="text-tb-black text-base mb-4">
					Wir bieten Ihnen eine große Auswahl an aktuellen Tests aus
					unterschiedlichen Verbrauchermagazinen und Testquellen. Aus
					einer Bandbreite von mehr als 2 Mio. Produkten können Sie
					sich bei uns ein interessantes Angebot aussuchen und
					bekommen die relevanten Informationen dazu gleich
					mitgeliefert.
				</p>
				<div class="p text-tb-black text-base">
					Neben technischen Daten und Details zum Produkt gibt es alle
					verfügbaren Testberichte, Meinungen und Angebote in
					übersichtlicher Aufbereitung. Bis zu 5 Bilder in der Galerie
					und Produktvideos ergänzen das umfängliche Angebot. Wir
					vergleichen für Sie Produkte in unserer Merkliste, wir
					bieten eine Vielzahl an Sortier- und Filtermöglichkeiten und
					auch unterwegs sind Sie mit unserer kostenlosen App immer
					bestens informiert.
				</div>
			</div>
		</div>
		<div class="home-why-content">
			<div class="home-why-image-wrapper pt-12 pb-3">
				<img
					src="~/assets/images/home/why-2.svg"
					class="h-40 transition transform duration-1000 hover:-translate-y-1"
					alt
				/>
			</div>
			<p
				class="text-tb-black home-why-title text-22 font-normal mb-2"
			>Testsieger, Preissieger und Highlights</p>
			<div class="home-why-desc-wrapper px-1">
				<p class="text-tb-black text-base mb-4">
					Aus mehr als 50 Mio. Angeboten finden Sie die besten
					Produkte jeder Kategorie. Als Dienstleister für den
					Verbraucher bieten wir Ihnen eine einfache und dennoch
					umfassende Möglichkeit über aktuelle Technik und Produkte
					aus dem Alltag informiert zu sein. Auszeichnungen wie
					Testsieger, Preissieger und Highlights werden Ihnen eine
					große Hilfe bei der Kaufentscheidung sein. Aus einer
					Vielzahl an Tests liefern wir Ihnen eine Zusammenfassung und
					eine entsprechende Note zum besseren Vergleich.
				</p>
				<div class="p text-tb-black text-base">
					Zur Unterstützung finden Sie bei uns eine große Auswahl an
					ganz persönlichen Meinungen und Erfahrungen anderer Käufer,
					die Sie bei Ihrer Entscheidung sicher unterstützen werden.
				</div>
			</div>
		</div>
		<div class="home-why-content">
			<div class="home-why-image-wrapper pt-12 pb-3">
				<img
					src="~/assets/images/home/why-3.svg"
					class="h-40 transition transform duration-1000 hover:-translate-y-1"
					alt
				/>
			</div>
			<p class="text-tb-black home-why-title font-normal text-22 mb-2">Unabhängig und kostenfrei</p>
			<div class="home-why-desc-wrapper px-1">
				<p class="text-tb-black text-base mb-4">
					Wir von Testbericht.de haben uns als kundenorientierter
					Dienstleister auf die Fahne geschrieben, Sie als Besucher
					unserer Webseite in den Mittelpunkt zu stellen. Daher
					arbeiten wir absolut transparent, neutral und sind
					unabhängig.
				</p>
				<div class="p text-tb-black text-base">
					Testberichte und Meinungen werden stets mit größter Sorgfalt
					auf Richtigkeit überprüft. Bei der Auswahl unserer Partner
					und Testberichte achten wir stets auf Seriosität und
					Qualität. Das Beste zum Schluss, unser Service ist für Sie
					absolut kostenlos.
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "HomeWhy",
};
</script>

<style scoped>
.home-why-content {
	width: calc(33.33% - 16px);
}
</style>
