<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Kysymys from '$lib/components/Kysymys.svelte';
	import { onMount } from 'svelte';

	let sivu: 'peli' | 'lopetus' = $state('peli');

	//tämän tarkoitus olisi pitää yllä monennessako alkiossa mennään valitutKysymykset taulukossa
	//Toisin sanoen auttaisi menemään läpi kaikki kysymykset
	//Voidaan käyttää myös muihin ominaisuuksiin tarvittaessa
	let monesKysymys: number = $state(0);

	//Pistelaskuri - oma komponentti?
	let pisteet: number = $state(0);

	//Kysymyksien haku
	interface Kysymys {
		id: string;
		img: string;
		kysymys: string;
		vastaukset?: string[] | null;
		oikeaVastaus: string;
		vaikeustaso: string;
	}

	let kysymykset: Kysymys[] = $state([]);

	onMount(async () => {
		const response = await fetch('/data/kysymykset.json');
		if (!response.ok) {
			throw new Error('Dataa ei löytynyt');
		}
		kysymykset = await response.json();
		randomKysymykset(kysymykset);
	});

	//randomit kysymykset
	let valitutKysymykset: Kysymys[] = $state([]);

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

{#if sivu === 'peli'}
	<!--Pelisivu-->
	<h1>Pelisivu</h1>

	{#if valitutKysymykset.length > 0 && monesKysymys < valitutKysymykset.length}
		<Kysymys
			id={valitutKysymykset[monesKysymys].id}
			img={valitutKysymykset[monesKysymys].img}
			kysymys={valitutKysymykset[monesKysymys].kysymys}
			vastaukset={valitutKysymykset[monesKysymys].vastaukset}
			oikeaVastaus={valitutKysymykset[monesKysymys].oikeaVastaus}
		/>
		<p>{monesKysymys + 1}</p>
		<Button otsikko="seuraava" disabled={false} onclick={() => monesKysymys++} />
	{:else if monesKysymys == valitutKysymykset.length}
		<h1>Pelasit loppuun!</h1>
		<p>haluatko pelata uudestaan??</p>
		<Button otsikko="Uudestaan" disabled={false} onclick={() => goto('/')} />
	{:else}
		<h1>Loading...</h1>
	{/if}

	<!-- {#each valitutKysymykset as kysymys}
		<Kysymys
			id={kysymys.id}
			img={kysymys.img}
			kysymys={kysymys.kysymys}
			vastaukset={kysymys.vastaukset}
			oikeaVastaus={kysymys.oikeaVastaus}
		/>
	{:else}
		<h1>Loading...</h1>
	{/each} -->
{:else if sivu === 'lopetus'}
	<!--Lopetussivu-->
	<h1>Pelasit loppuun!</h1>
	<p>haluatko pelata uudestaan??</p>
	<Button otsikko="Uudestaan" disabled={false} onclick={() => goto('/')} />
{/if}
