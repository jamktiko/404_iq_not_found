<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	let sivu: 'aloitus' | 'lopetus' = 'aloitus';
</script>

<!--Placeholdereita oikeille asioilla-->
{#if sivu === 'aloitus'}
	<!--Aloitussivu-->
	<h1>404 IQ Not Found</h1>

	<Button otsikko="Aloita" disabled={false} onclick={() => (sivu = 'lopetus')} />
{:else if sivu === 'lopetus'}
	<!--Lopetussivu-->
	<h1>Pelasit loppuun!</h1>
	<p>haluatko pelata uudestaan?</p>
	<Button otsikko="Uudestaan" disabled={false} onclick={() => (sivu = 'aloitus')} />
{/if}

<style></style>
