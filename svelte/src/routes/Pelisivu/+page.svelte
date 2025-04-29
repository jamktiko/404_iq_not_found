<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Kysymys from '$lib/components/Kysymys.svelte';

	let sivu: 'peli' | 'lopetus' = $state('peli');

	//tämän tarkoitus olisi pitää yllä monennessako alkiossa mennään valitutKysymykset taulukossa
	//Toisin sanoen auttaisi menemään läpi kaikki kysymykset
	//Voidaan käyttää myös muihin ominaisuuksiin tarvittaessa
	let monesKysymys: number = $state(0);

	//Pistelaskuri - oma komponentti?
	let pisteet: number = $state(0);
</script>

{#if sivu === 'peli'}
	<!--Pelisivu-->
	<h1>Pelisivu</h1>

	<Kysymys />

	<Button otsikko="takaisin" onclick={() => (sivu = 'lopetus')} />
{:else if sivu === 'lopetus'}
	<!--Lopetussivu-->
	<h1>Pelasit loppuun!</h1>
	<p>haluatko pelata uudestaan??</p>
	<Button otsikko="Uudestaan" disabled={false} onclick={() => goto('/')} />
{/if}
