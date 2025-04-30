<script lang="ts">
	import '$lib/fonts/fonts.css';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Kysymys from '$lib/components/Kysymys.svelte';
	import { onMount, onDestroy } from 'svelte';

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

	// vaihda oikeeseen json tiedostoon ja tee muokkaukset sen mukaan
	onMount(async () => {
		document.body.className = 'pelisivu-body';
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
			throw new Error('Dataa ei ole tarpeeksi');
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

	<!-- //KATSO KESKIVIIKKONA!!!!
	//Pisteistä ja moneskysymys pitää tehdä globaali muuttujat, että niitä voidaan välittää pelisivun ja tämän komponentin väleillä
   -->
	{#if valitutKysymykset.length > 0 && monesKysymys < valitutKysymykset.length}
		<div class="moneskysymys">
			<h2>Kysymys: {monesKysymys + 1} / {valitutKysymykset.length}</h2>
		</div>
		<div class="pisteet">
			<p>Pisteesi: {pisteet}</p>
		</div>

		<Kysymys
			id={valitutKysymykset[monesKysymys].id}
			img={valitutKysymykset[monesKysymys].img}
			kysymys={valitutKysymykset[monesKysymys].kysymys}
			vastaukset={valitutKysymykset[monesKysymys].vastaukset}
			oikeaVastaus={valitutKysymykset[monesKysymys].oikeaVastaus}
			bind:monesKysymys
			bind:pisteet
		/>

		<Button vastaus={false} otsikko="seuraava" disabled={false} onclick={() => monesKysymys++} />
		<Button vastaus={false} otsikko="Keskeytä" disabled={false} onclick={() => goto('/')} />
	{:else if monesKysymys == valitutKysymykset.length}
		<!-- Tämä näkyy kun lataa uudestaan sivua -->
		<h1>Pelasit loppuun!</h1>
		<p>haluatko pelata uudestaan??</p>
		<Button vastaus={false} otsikko="Uudestaan" disabled={false} onclick={() => goto('/')} />
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
	<Button vastaus={false} otsikko="Uudestaan" disabled={false} onclick={() => goto('/')} />
{/if}

<style>
	:global(body.pelisivu-body) {
		margin: 0;
		font-family: 'Jaro', sans-serif;
		font-size: 25px;
		background: url('img/taustakuvakokeilu.png') no-repeat center center fixed;
		background-size: cover;
		color: white;
	}

	.pisteet {
		position: absolute;
		top: 10px;
		right: 100px;
		width: 70px;
		height: 50px;
		font-size: smaller;
	}
	.moneskysymys {
		position: absolute;
		top: 10px;
		left: 100px;
		width: 70px;
		height: 50px;
		font-size: smaller;
	}
</style>
