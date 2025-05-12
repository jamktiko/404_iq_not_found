<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Kysymys from '$lib/components/Kysymys.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fly, blur } from 'svelte/transition';
	import type { IKysymys } from '$lib/types/kysymys.d.ts';

	import { asetukset } from '$lib/components/asetukset.svelte';

	import Modalv404 from '$lib/components/Modalv404.svelte';

	//tämän tarkoitus olisi pitää yllä monennessako alkiossa mennään valitutKysymykset taulukossa
	//Toisin sanoen auttaisi menemään läpi kaikki kysymykset
	//Voidaan käyttää myös muihin ominaisuuksiin tarvittaessa
	let monesKysymys: number = $state(1);

	//Pistelaskuri - oma komponentti?
	let pisteet: number = $state(0);

	let kysymykset: IKysymys[] = $state([]);

	// vaihda oikeeseen json tiedostoon ja tee muokkaukset sen mukaan
	onMount(async () => {
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
	const montaKysymysta = asetukset.montaKysymysta;

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

		return valitutKysymykset;
	}
	// Keskeytä peli
	let showModal = $state(false);
	function ifConfirm() {
		goto('/');
	}
	function ifCancel() {
		console.log('cancel');
	}

	function ifClose() {
		showModal = false;
	}
</script>

<!--Pelisivu-->
<div>
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

		<div
			class="exit"
			onclick={() => (showModal = true)}
			in:fly={{ x: 500, duration: 1000, delay: 1500 }}
			out:fly={{ x: -500, duration: 1000, delay: 500 }}
		>
			<img src="/img/exitt.png" alt="back to menu" style="cursor: pointer;" />
		</div>
		<Modalv404
			bind:open={showModal}
			title="Vahvista lopetus"
			onConfirm={ifConfirm}
			onCancel={ifCancel}
			onClose={ifClose}
			showFooter={true}
			info={false}
		>
			{#snippet children()}
				<p>Haluatko varmasti lopettaa pelin?</p>
			{/snippet}
		</Modalv404>

		<div
			in:fly={{ x: 500, duration: 1000, delay: 2000 }}
			out:fly={{ x: -500, duration: 1000, delay: 800 }}
		>
			{#key monesKysymys}
				<div
					in:fly={{ x: 500, duration: 1000, delay: 1500 }}
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
		<div
			class="vinkki"
			in:fly={{ x: 300, duration: 1000, delay: 2800 }}
			out:fly={{ x: -300, duration: 1000, delay: 1300 }}
		>
			<p>Klikkaa kuvaa suurentaaksesi sitä</p>
		</div>
	{:else if monesKysymys - 1 == montaKysymysta}
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
</div>

<style>
	/* div {
	} */

	.exit {
		width: fit-content;
	}

	.pisteet {
		position: absolute;
		top: 10px;
		right: 100px;
		width: 70px;
		height: 50px;
		font-size: 24px;
	}
	.vinkki {
		position: absolute;
		top: 140px;
		right: 90px;
		width: 200px;
		height: 50px;
		font-size: 20px;
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
		width: 68px;
		height: auto;
	}
	.vinkki {
		transform: translateX(50px);
	}
	@media (max-width: 1210px) {
		.vinkki {
			position: absolute;
			top: 10px;
			right: 10px;
			font-size: 20px;
			padding: 4px;
			z-index: 100;
		}
	}
</style>
