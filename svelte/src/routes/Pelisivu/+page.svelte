<script lang="ts">
	import '$lib/fonts/fonts.css';
	import Button from '$lib/components/Button.svelte';
	import Kysymys from '$lib/components/Kysymys.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { IKysymys } from '$lib/types/kysymys.d.ts';

	let sivu: 'peli' | 'lopetus' = $state('peli');

	//tämän tarkoitus olisi pitää yllä monennessako alkiossa mennään valitutKysymykset taulukossa
	//Toisin sanoen auttaisi menemään läpi kaikki kysymykset
	//Voidaan käyttää myös muihin ominaisuuksiin tarvittaessa
	let monesKysymys: number = $state(1);

	//Pistelaskuri - oma komponentti?
	let pisteet: number = $state(0);

	let kysymykset: IKysymys[] = $state([]);

	// vaihda oikeeseen json tiedostoon ja tee muokkaukset sen mukaan
	onMount(async () => {
		document.body.className = 'pelisivu-body';
		const response = await fetch('/data/kysymykset_full.json');
		if (!response.ok) {
			throw new Error('Dataa ei löytynyt');
		}
		kysymykset = await response.json();
		randomKysymykset(kysymykset);
	});

	//randomit kysymykset
	let valitutKysymykset: IKysymys[] = $state([]);
	//montako kysymystä halutaan
	const montaKysymysta = 10;

	function randomKysymykset(taulukko: IKysymys[]) {
		//Tämä määrää, montako kysymystä halutaan
		//Virheen tarkistus tähän
		if (taulukko.length < montaKysymysta) {
			throw new Error('Dataa ei ole tarpeeksi');
		}
		while (valitutKysymykset.length < montaKysymysta) {
			//Tähän muuttujaan tallennetaan hetkellisesti kysymys
			let a: IKysymys;

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

<!-- {#if sivu === 'peli'} -->
<!--Pelisivu-->

<!-- //KATSO KESKIVIIKKONA!!!!
	//Pisteistä ja moneskysymys pitää tehdä globaali muuttujat, että niitä voidaan välittää pelisivun ja tämän komponentin väleillä
   -->
{#if valitutKysymykset.length > 0 && monesKysymys - 1 < valitutKysymykset.length}
	<div
		class="moneskysymys"
		in:fly={{ x: 300, duration: 1000, delay: 1500 }}
		out:fly={{ x: -300, duration: 1000, delay: 1300 }}
	>
		<h2
			in:fly={{ x: 300, duration: 1000, delay: 1500 }}
			out:fly={{ x: -300, duration: 1000, delay: 1300 }}
		>
			Kysymys: {monesKysymys} / {valitutKysymykset.length}
		</h2>
	</div>
	<div
		class="pisteet"
		in:fly={{ x: 300, duration: 1000, delay: 1500 }}
		out:fly={{ x: -300, duration: 1000, delay: 1300 }}
	>
		<p>Pisteesi: {pisteet}</p>
	</div>
	<div onclick={() => goto('/')} class="info">
		<img src="img/exitt.png" alt="back to menu" style="cursor: pointer;" />
	</div>
	<div
		in:fly={{ x: 500, duration: 1000, delay: 2000 }}
		out:fly={{ x: -500, duration: 1000, delay: 800 }}
	>
		{#key monesKysymys}
			<div
				in:fly={{ x: 500, duration: 1000, delay: 1300 }}
				out:fly={{ x: -500, duration: 1000, delay: 500 }}
			>
				<Kysymys
					img={valitutKysymykset[monesKysymys - 1].img}
					kysymys={valitutKysymykset[monesKysymys - 1].question}
					vastaukset={valitutKysymykset[monesKysymys - 1].vastaukset}
					oikeaVastaus={valitutKysymykset[monesKysymys - 1].oikeaVastaus}
					bind:monesKysymys
					bind:pisteet
				/>
			</div>
		{/key}
	</div>
{:else if monesKysymys - 1 == montaKysymysta}
	<!-- Tämä näkyy kun lataa uudestaan sivua -->

	<div
		class="overlay"
		in:fly={{ x: 300, duration: 1000, delay: 2400 }}
		out:fly={{ x: -300, duration: 1000, delay: 200 }}
	>
		<div class="center-box">
			<p class="viesti">Onnea, pääsit pelin loppuun!</p>
			<p class="pisteet">Pisteet: <span id="pisteet">{pisteet}</span></p>
		</div>
		<Button vastaus={false} otsikko="Uudestaan" disabled={false} onclick={() => goto('/')} />
	</div>
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
<!-- {:else if sivu === 'lopetus'} -->
<!--Lopetussivu-->
<!-- <h1>Pelasit loppuun!</h1>
	<p>haluatko pelata uudestaan??</p>
	<Button vastaus={false} otsikko="Uudestaan" disabled={false} onclick={() => goto('/')} />
{/if} -->

<style>
	:global(body.pelisivu-body) {
		overflow-x: hidden;
		overflow-y: hidden;
		margin: 0;
		font-family: 'Jaro', sans-serif;
		font-size: 20px;
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
		font-size: 24px;
	}
	.moneskysymys {
		position: absolute;
		top: 10px;
		left: 100px;
		width: 80px;
		height: 50px;
		font-size: 18px;
	}
	.overlay {
		position: relative;
		width: 100vw;
		height: 70vh;
		backdrop-filter: blur(4px);
		display: flex;
		font-family: 'Jaro';
		flex-direction: column;
		align-items: center;
		justify-content: center;
		transform: translateY(15vh);
	}
	.center-box {
		background-color: #000;
		padding: 3rem;
		border-radius: 10px;
		border: 6px solid #ccc;
		margin-bottom: 1rem;
		width: 350px;
	}
	.center-box .viesti {
		font-weight: bold;
		font-size: 1.5rem;
		padding-bottom: 40px;
		margin-bottom: 1rem;
		text-align: center;
	}
	.center-box .pisteet {
		font-weight: bold;
		font-size: 1.5rem;
		text-align: center;
	}

	@media (max-width: 1200px) {
		:global(body.pelisivu-body) {
			overflow-y: auto;
		}
		.center-box {
			width: 80%;
			padding: 1.5rem;
		}
		.moneskysymys,
		.pisteet {
			position: relative;
			top: auto;
			left: auto;
			right: auto;
			width: auto;
			height: auto;
			font-size: 14px;
			display: inline-block;
			margin: 0 10px;
		}
	}
	img {
		width: 50px;
		height: auto;
	}
</style>
