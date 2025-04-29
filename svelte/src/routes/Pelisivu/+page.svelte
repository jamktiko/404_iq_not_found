<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';

	let sivu: 'peli' | 'lopetus' = 'peli';
	//tee sivu pelille ja reititä
</script>

{#if sivu === 'peli'}
	<!--Aloitussivu-->
	<h1>Pelisivu</h1>

	<Button otsikko="takaisin" onclick={() => (sivu = 'lopetus')} />
{:else if sivu === 'lopetus'}
	<!--Lopetussivu-->
	<h1>Pelasit loppuun!</h1>
	<p>haluatko pelata uudestaan??</p>
	<Button otsikko="Uudestaan" disabled={false} onclick={() => goto('/')} />
{/if}
