<script lang="ts">
	import '$lib/fonts/fonts.css';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import { asetukset } from '$lib/components/asetukset.svelte';
	import { onMount } from 'svelte';

	let teema: 'default' | 'olio' | 'kahvi' = $state(asetukset.teema);

	let valittuteema = $state(asetukset.teema);
	onMount(() => {
		document.body.classList.remove('theme-default', 'theme-olio', 'theme-kahvi');
		document.body.classList.add(`theme-${valittuteema}`);
	});
</script>

<!-- Lisää vielä monta kysymystä käyttäjä haluaa -->
<!-- <div
	in:fly={{ x: -1000, delay: 3000, duration: 800 }}
	out:fly={{ x: -1000, duration: 800, delay: 300 }} -->
<!-- {#if teema === 'default'} -->
<div
	class="body_default"
	in:fly={{ delay: 2500, x: -1000, duration: 800 }}
	out:fly={{ delay: 300, x: -1000, duration: 800 }}
>
	<select bind:value={teema}>
		<option value="default">Default</option>
		<option value="olio">Olio</option>
		<option value="kahvi">Kahvi</option>
	</select>
	<Button
		vastaus={false}
		otsikko="Aseta teema"
		disabled={false}
		onclick={() => (asetukset.teema = teema)}
	/>

	<Button vastaus={false} otsikko="Takaisin" disabled={false} onclick={() => goto('/')} />
</div>

<!-- {:else if teema === 'olio'}
		<div class="body_olio">
			<select bind:value={teema}>
				<option value="default">Default</option>
				<option value="olio">Olio</option>
				<option value="kahvi">Kahvi</option>
			</select>
			<Button
				vastaus={false}
				otsikko="Aseta teema"
				disabled={false}
				onclick={() => (asetukset.teema = teema)}
			/>

			<Button vastaus={false} otsikko="Takaisin" disabled={false} onclick={() => goto('/')} />
		</div>
	{:else if teema === 'kahvi'}
		<div class="body_kahvi">
			<select bind:value={teema}>
				<option value="default">Default</option>
				<option value="olio">Olio</option>
				<option value="kahvi">Kahvi</option>
			</select>
			<Button
				vastaus={false}
				otsikko="Aseta teema"
				disabled={false}
				onclick={() => (asetukset.teema = teema)}
			/> -->
<!-- 
			<Button vastaus={false} otsikko="Takaisin" disabled={false} onclick={() => goto('/')} />
		</div>
	{/if} -->
<!-- </div> -->

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
	/* Olio */
	:global(body.theme-olio) {
		overflow-x: hidden;
		overflow-y: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		background: url('img/Hi.gif') no-repeat center center fixed black;
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
