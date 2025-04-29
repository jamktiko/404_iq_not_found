<script lang="ts">
	interface Props {
		id: string;
		img: string;
		kysymys: string;
		vastaukset?: string[] | null;
		oikeaVastaus: string;
	}

	let { id, img, kysymys, vastaukset, oikeaVastaus }: Props = $props();
	//Päivän kysymys: miten saan kysymykset, kuvat ja vastaukset näkymään pelisivulla?

	//Propin kautta aina valituskysymykset taulukon alkio kerrallaan?
</script>

<!--Placeholdereita oikeille asioilla-->
<img src={img} alt="Koodi" />

<h1>{kysymys}</h1>

{#if vastaukset}
	{#each vastaukset as vastaus}
		<button>{vastaus}</button>
		<br />
	{/each}
{/if}
