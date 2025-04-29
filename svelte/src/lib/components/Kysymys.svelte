<script lang="ts">
	import Button from './Button.svelte';
	interface Props {
		id: string;
		img: string;
		kysymys: string;
		vastaukset?: string[] | null;
		oikeaVastaus: string;
	}

	let { id, img, kysymys, vastaukset, oikeaVastaus }: Props = $props();

	function onkoOikeaVastaus(vastaus: string) {
		if (vastaus === oikeaVastaus) {
			//tässä pitäisi lisätä pisteen ja näyttää käyttäjälle, että oliko oikein
			//samalla laittaa timeouttiin, että menee seuraavaan kysymykseen
		}
	}
</script>

<!--Placeholdereita oikeille asioilla-->
<img src={img} alt="Koodi" />

<h1>{kysymys}</h1>

{#if vastaukset}
	{#each vastaukset as vastaus}
		<Button otsikko={vastaus} onclick={() => onkoOikeaVastaus(vastaus)} />
		<br />
	{/each}
{/if}
