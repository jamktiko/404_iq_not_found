<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';

	let sivu: 'aloitus' | 'lopetus' = 'aloitus';

	//tee sivu pelille ja reititä
</script>

<!--Placeholdereita oikeille asioilla-->
{#if sivu === 'aloitus'}
	<!--Aloitussivu-->
	<h1>404 IQ Not Found</h1>

	<Button otsikko="Aloita" disabled={false} onclick={() => goto('/Pelisivu')} />
{:else if sivu === 'lopetus'}
	<!--Lopetussivu-->
	<h1>Pelasit loppuun!</h1>
	<p>haluatko pelata uudestaan??</p>
	<Button otsikko="Uudestaan" disabled={false} onclick={() => (sivu = 'aloitus')} />
{/if}

<style></style>
