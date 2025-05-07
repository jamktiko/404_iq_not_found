<script lang="ts">
	import '$lib/fonts/fonts.css';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import { asetukset } from '$lib/components/asetukset.svelte';
	let teema: 'default' | 'olio' | 'kahvi' = $state('default');
</script>

<div in:fade={{ delay: 2500, duration: 500 }} out:fly={{ x: -1000, duration: 800, delay: 50 }}>
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
