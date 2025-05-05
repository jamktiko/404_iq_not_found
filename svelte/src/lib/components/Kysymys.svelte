<script lang="ts">
	import Button from './Button.svelte';

	interface Props {
		img: string;
		kysymys: string;
		vastaukset?: string[] | null;
		oikeaVastaus: string;
		monesKysymys: number;
		pisteet: number;
	}

	let {
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

			pisteet++;
		}

		console.log('väärin');
		monesKysymys++;
	}
</script>

<div class="container">
	<div class="code-block">
		<img src={img} alt="Koodi" />
	</div>

	<div class="question">
		{kysymys}
	</div>

	{#if vastaukset}
		{#each vastaukset as vastaus}
			<Button vastaus={true} otsikko={vastaus} onclick={() => onkoOikeaVastaus(vastaus)} />
			<br />
		{/each}
	{/if}
</div>

<style>
	.question {
		font-size: 24px;
		background: white;
		color: black;
		padding: 18px;
		margin-bottom: 10px;
		border-radius: 10px;
		text-align: center;
		width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.code-block {
		background: #ffffffaa;
		width: 700px;
		height: 150px;
		margin-bottom: 10px;
		border-radius: 10px;
	}
	.container {
		max-width: 700px;
		margin: 5px auto;
		border-radius: 20px;
		padding: 20px;
	}
	img {
		width: 700px;
		height: 150px;
		object-fit: initial;
	}

</style>
