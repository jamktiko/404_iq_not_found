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
	});

	let valitutKysymykset: Kysymys[] = [];
	function randomKysymykset(taulukko: Kysymys[]) {
		//Virheen tarkistus tähän

		//Tämä määrää, montako kysymystä halutaan
		const montaKysymysta = 5;
		for (let i = 0; i <= montaKysymysta; i++) {
			//Tähän muuttujaan tallennetaan hetkellisesti kysymys
			let a: Kysymys;

			//random numero 0-taulukonpituus
			//virheen tarkistus?
			const ind: number = Math.floor(Math.random() * kysymykset.length);

			//Tässä tallennetaan muuttujaan taulukosta kyseisen indeksin tiedot
			a = kysymykset[ind];

			//Käydään läpi valitutkysymykset taulukko, onko kyseinen objekti jo taulukossa (jos on, älä tee mitään, jos ei ole, push), tämä tehdään id:n avulla
			//Jos taulukossa ei vielä ole mitään, pushaa
			if (valitutKysymykset.length === 0) {
				valitutKysymykset.push(a);
				continue;
			}

			if (!valitutKysymykset.some((onkoID) => onkoID.id === a.id)) {
				valitutKysymykset.push(a);
			}
		}
		return valitutKysymykset;
	}
	console.log(valitutKysymykset);
</script>
