<script lang="ts">
	import { onMount } from 'svelte';

	interface Kysymys {
		id: string;
		img: string;
		kysymys: string;
		vastaukset?: string[] | null;
		oikeaVastaus: string;
		vaikeustaso: string;
	}

	let kysymykset: Kysymys[] = [];

	onMount(async () => {
		const response = await fetch('/data/kysymykset.json');
		if (!response.ok) {
			throw new Error('Dataa ei löytynyt');
		}
		kysymykset = await response.json();
		randomKysymykset(kysymykset);
	});

	let valitutKysymykset: Kysymys[] = [];
	function randomKysymykset(taulukko: Kysymys[]) {
		//Tämä määrää, montako kysymystä halutaan
		const montaKysymysta = 5;
		//Virheen tarkistus tähän
		if (taulukko.length < montaKysymysta) {
			throw new Error('Data ei ole tarpeeksi');
		}
		while (valitutKysymykset.length < montaKysymysta) {
			//Tähän muuttujaan tallennetaan hetkellisesti kysymys
			let a: Kysymys;

			//random numero 0-taulukonpituus
			//virheen tarkistus?
			const ind: number = Math.floor(Math.random() * taulukko.length);

			//Tässä tallennetaan muuttujaan taulukosta kyseisen indeksin tiedot
			a = taulukko[ind];

			//Käydään läpi valitutkysymykset taulukko, onko kyseinen objekti jo taulukossa (jos on, älä tee mitään, jos ei ole, push), tämä tehdään id:n avulla
			if (!valitutKysymykset.some((onkoID) => a.id === onkoID.id)) {
				valitutKysymykset.push(a);
			}
		}
		console.log(valitutKysymykset);
		return valitutKysymykset;
	}
</script>
