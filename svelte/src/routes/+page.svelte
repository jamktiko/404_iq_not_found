<script lang="ts">
	import '$lib/fonts/fonts.css';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	import { asetukset } from '$lib/components/asetukset.svelte';

	let teema = $state(asetukset.teema);

	// onMount(() => {
	// 	document.body.classList.remove('theme-default', 'theme-olio', 'theme-kahvi');
	// 	document.body.classList.add(`theme-${teema}`);
	// });

	import Modalv404 from '$lib/components/Modalv404.svelte';
	let showModal = $state(false);
	function closeModal() {
		showModal = false;
	}
	// in:fade={{ delay: 900, duration: 500 }} out:fly={{ x: -1000, duration: 1000, delay: 300 }}
</script>

<!--Aloitussivu-->

<div
	class="body"
	in:fade={{ delay: 900, duration: 500 }}
	out:fly={{ x: -1000, duration: 1000, delay: 300 }}
>
	<button onclick={() => (showModal = true)} class="info">i</button>
	<Modalv404
		bind:open={showModal}
		title="infopläjäys"
		onClose={closeModal}
		showFooter={false}
		info={true}
	>
		{#snippet children()}
			<p>404 IQ Not Found on yksinkertainen tietovisa, jossa</p>
			<p>luetaan koodia kuvasta ja vastataan monivalintakysymykseen.</p>
			<p>Pelin tarkoitus on opetella koodin lukemista.</p>
			<p>Voit valita oman teeman ja kuinka monta kysymystä haluat!</p>
			<hr />
			<p>Tekijät: Netta, Minttu, Annika, Joona</p>
		{/snippet}
	</Modalv404>

	<h2>404</h2>
	<h1>IQ Not Found</h1>
	<Button vastaus={false} otsikko="Aloita" disabled={false} onclick={() => goto('/Pelisivu')} />
	<div
		class="settings"
		onclick={() => {
			goto('/Asetukset');
		}}
		style="cursor: pointer;"
	>
		<img class="asetukset" src="/img/settings.png" alt="settings" />
	</div>
</div>

<style>
	.asetukset {
		width: 60px;
		position: absolute;
		top: 40px;
		left: 30px;
	}
	.body {
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		min-height: 100vh;
		font-family: 'Jaro', sans-serif;
		text-align: center;
	}
	h2 {
		color: #7d1313;
		/* -webkit-text-stroke: 7px #ff0000; */
		font-family: 'Jaro';
		font-size: 144px;
		font-style: normal;
		font-weight: 400;
		line-height: 1.2;
		/* text-shadow:
			1px 1px 15px #ff0000,
			1px 1px 15px #ff0000; */
		margin-top: 0px;
		margin-bottom: 5px;
		animation: glow 1s ease-in-out infinite alternate;
	}

	@-webkit-keyframes glow {
		from {
			text-shadow:
				0 0 5px rgb(255, 118, 118),
				1px 1px 10px #551212,
				0 0 30px #ff00006a,
				0 0 40px #ff00006a,
				0 0 50px #ff00006a;
		}

		to {
			text-shadow:
			  0 0 5px rgb(255, 130, 130),
				0 0 5px rgb(255, 118, 118),
				0 0 10px rgba(68, 9, 9, 0.558),
				1px 1px 10px #7e0b0b,
				0 0 30px #ff0000c9,
				0 0 20px #ff0000c9,
				0 0 90px #ff0000aa,
				10px 10px 110px #ff00008a;
		}
	}

	h1 {
		color: #000;
		-webkit-text-stroke: 7px #ffffff;
		font-family: 'Jaro';
		font-size: 110px;
		font-style: normal;
		font-weight: 400;
		line-height: 1.2;
		text-shadow:
			1px 1px 10px #fff,
			1px 1px 10px #ccc;
		margin-top: 0px;
		margin-bottom: 65px;
	}
	.info {
		position: absolute;
		top: 40px;
		right: 30px;
		width: 50px;
		height: 50px;
		background-color: black;
		border: 3px solid rgb(255, 255, 255);
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		border-radius: 8px;
		color: white;
		font-weight: bold;
		font-family: sans-serif;
		font-size: 42px;
		text-align: center;
		cursor: pointer;
	}

	.info:hover {
		background: #083a08;
	}

	@media (max-width: 900px) {
		h1 {
			font-size: 100px;
		}
		h2 {
			font-size: 130px;
			padding: 10px;
		}
	}

	@media (max-width: 820px) {
		h1 {
			font-size: 90px;
			-webkit-text-stroke: 6px #ffffff;
		}
		h2 {
			font-size: 120px;
			padding: 10px;
		}
	}
	@media (max-width: 700px) {
		h1 {
			font-size: 85px;
			-webkit-text-stroke: 5px #ffffff;
		}
		h2 {
			font-size: 95px;
			padding: 10px;
		}
	}
	@media (max-width: 650px) {
		h1 {
			font-size: 70px;
			-webkit-text-stroke: 5px #ffffff;
		}
		h2 {
			font-size: 95px;
			padding: 10px;
		}
	}

	@media (max-width: 600px) {
		h1 {
			font-size: 60px;
			-webkit-text-stroke: 3px #ffffff;
		}
		h2 {
			font-size: 90px;
			margin: 20px;
		}
		.info {
			position: absolute;
			right: 10px;
			top: 10px;
		}
		.asetukset {
			position: absolute;
			left: 10px;
			top: 10px;
		}
	}
</style>
