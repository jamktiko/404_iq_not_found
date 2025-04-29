<script lang="ts">
	import Button from './Button.svelte';
	interface Props {
		id: string;
		img: string;
		kysymys: string;
		vastaukset?: string[] | null;
		oikeaVastaus: string;
		monesKysymys: number;
		pisteet: number;
	}

	let {
		id,
		img,
		kysymys,
		vastaukset,
		oikeaVastaus,
		monesKysymys = $bindable(),
		pisteet = $bindable()
	}: Props = $props();

	//KATSO KESKIVIIKKONA!!!!
	//Pisteistä ja moneskysymys pitää tehdä globaali muuttujat, että niitä voidaan välittää pelisivun ja tämän komponentin väleillä

	function onkoOikeaVastaus(vastaus: string) {
		//parempi virheen tarkastus id:n kanssa???
		if (vastaus === oikeaVastaus) {
			//tässä pitäisi lisätä pisteen ja näyttää käyttäjälle, että oliko oikein
			//samalla laittaa timeouttiin, että menee seuraavaan kysymykseen
			console.log('Oikein!');

			return (
				pisteet++,
				setTimeout(() => {
					monesKysymys++;
				}, 5000)
			);
		}

		console.log('väärin');
		return setTimeout(() => {
			monesKysymys++;
		}, 5000);
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
