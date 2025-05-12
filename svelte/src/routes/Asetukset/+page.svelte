<script lang="ts">
	import '$lib/fonts/fonts.css';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import { asetukset } from '$lib/components/asetukset.svelte';
	let teema: 'default' | 'olio' | 'kahvi' = $state(asetukset.teema);
	let monta: number = $state(asetukset.montaKysymysta);

	let show = $state(false);
	let viesti = $state('');

	function asetaTeema() {
		asetukset.teema = teema;

		show = true;
		viesti = `Teema asetettu: ${teema}`;
		setTimeout(() => (show = false), 1500);
	}
	function asetaKysymys() {
		show = true;
		viesti = `Sinulta kysytään: ${monta} kysymystä`;
		setTimeout(() => (show = false), 1500);
		if (monta === 0) {
			viesti = 'Laita ny ees jonki verra kysymyksiä';
		}
		if (monta > 20 || monta === 69) {
			if (monta === 69) {
				viesti = 'hehe, Nice';
			} else {
				viesti = '20 on maksimi!!!';
			}
		}
		if (monta === 1) {
			viesti = '...';
		}
		if (monta === 2) {
			viesti = 'Nössö';
		}
		if (monta < 0) {
			viesti = 'Senkin höpsö';
		}

		asetukset.montaKysymysta = monta;
	}
</script>

<div
	in:fly={{ x: -1000, delay: 1500, duration: 500 }}
	out:fly={{ x: -1000, duration: 800, delay: 50 }}
>
	{#if show}
		<h1 transition:fade={{ duration: 300 }}>{viesti}</h1>
	{/if}

	<select bind:value={teema} class="teema">
		<option value="default">Default</option>
		<option value="olio">Olio</option>
		<option value="kahvi">Kahvi</option>
	</select>
	<Button vastaus={false} otsikko="Aseta teema" disabled={false} onclick={() => asetaTeema()} />

	<input type="number" bind:value={monta} class="monta" />
	<Button
		vastaus={false}
		otsikko="Aseta kysymysten määrä"
		disabled={false}
		onclick={() => asetaKysymys()}
	/>

	<Button vastaus={false} otsikko="Takaisin" disabled={false} onclick={() => goto('/')} />
</div>

<style>
	div {
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		min-height: 100vh;
		font-family: 'Jaro', sans-serif;
		text-align: center;
	}
.teema {
	display: block;
	width: 150px;
	background: rgb(233, 231, 231);
	color: rgb(0, 0, 0);
	font-family: 'Jaro';
	border: 2px solid white;
	border-radius: 15px;
	padding: 10px;
	margin: 1px 0;
	font-size: 20px;
	cursor: pointer;
	transition: background 0.3s;
	text-overflow: ellipsis;
	text-align: center;
}
.teema:hover {
	background:#b4b4b4;
}
.monta {
	display: block;
	width: 120px;
	height: 25px;
	background: rgb(233, 231, 231);
	color: rgb(0, 0, 0);
	font-family: 'Jaro';
	border: 2px solid white;
	border-radius: 15px;
	padding: 10px;
	margin: 1px 0;
	font-size: 20px;
	cursor: pointer;
	transition: background 0.3s;
	text-overflow: ellipsis;
	text-align: center;
}
</style>
