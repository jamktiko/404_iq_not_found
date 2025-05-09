<script lang="ts">
	import '$lib/fonts/fonts.css';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { asetukset } from '$lib/components/asetukset.svelte';

	let teema = $state(asetukset.teema);

	onMount(() => {
		document.body.classList.remove('theme-default', 'theme-olio', 'theme-kahvi');
		document.body.classList.add(`theme-${teema}`);
	});
</script>

<!--Aloitussivu-->

<div in:fade={{ delay: 900, duration: 500 }} out:fly={{ x: -1000, duration: 1000, delay: 300 }}>
	{#if teema === 'default'}
		<div
			class="body_default"
			in:fade={{ delay: 900, duration: 500 }}
			out:fly={{ x: -1000, duration: 1000, delay: 300 }}
		>
			<div class="info">i</div>

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
	{:else if teema === 'olio'}
		<div class="body_olio">
			<div class="info">i</div>
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
	{:else if teema === 'kahvi'}
		<div class="body_kahvi">
			<div class="info">i</div>
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
	{/if}
</div>

<style>
	/* Default */
	:global(body.theme-default) {
		overflow-x: hidden;
		overflow-y: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		background: url('/img/taustakuvakokeilu.png') no-repeat center center fixed black;
		background-size: cover;
		color: white;
	}
	.asetukset {
		width: 60px;
		position: absolute;
		top: 40px;
		left: 30px;
	}
	.body_default {
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
		-webkit-text-stroke: 7px #ff0000;
		font-family: 'Jaro';
		font-size: 144px;
		font-style: normal;
		font-weight: 400;
		line-height: 1.2;
		text-shadow:
			1px 1px 15px #ff0000,
			1px 1px 15px #ff0000;
		margin-top: 0px;
		margin-bottom: 5px;
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

	/* Olio */

	:global(body.theme-olio) {
		overflow-x: hidden;
		overflow-y: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		background: url('/img/Hi.gif') no-repeat center center fixed black;
		background-size: cover;
		color: white;
	}
	.body_olio {
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		min-height: 100vh;
		font-family: 'Jaro', sans-serif;
		text-align: center;
	}

	/* Kahvi */
	:global(body.theme-kahvi) {
		overflow-x: hidden;
		overflow-y: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		background: url('') no-repeat center center fixed black;
		background-size: cover;
		color: white;
	}

	.body_kahvi {
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		min-height: 100vh;
		font-family: 'Jaro', sans-serif;
		text-align: center;
	}
</style>
