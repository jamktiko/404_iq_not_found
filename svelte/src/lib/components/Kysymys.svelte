<script lang="ts">
	import Button from './Button.svelte';
	import { fade } from 'svelte/transition';

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

	let show = $state(false);
	let menikoOikein: 'Oikein!' | 'Väärin!' = $state('Oikein!');
	let disabled = $state(false);

	function onkoOikeaVastaus(vastaus: string) {
		disabled = true;
		if (vastaus === oikeaVastaus) {
			//tässä pitäisi lisätä pisteen ja näyttää käyttäjälle, että oliko oikein
			//samalla laittaa timeouttiin, että menee seuraavaan kysymykseen
			menikoOikein = 'Oikein!';

			pisteet++;
			show = true;
			setTimeout(() => (show = false), 1000);
			setTimeout(() => monesKysymys++, 1500);
			setTimeout(() => (disabled = false), 1600);
			return;
		}

		menikoOikein = 'Väärin!';
		show = true;
		setTimeout(() => (show = false), 1000);
		setTimeout(() => monesKysymys++, 1500);
		setTimeout(() => (disabled = false), 1600);
	}

	let isExpanded = $state(false);
</script>

<div class="menikoOikein">
	{#if show}
		<h1 transition:fade={{ duration: 300 }}>{menikoOikein}</h1>
	{/if}
</div>

<div class="container">
	<div class="code-block">
		<img
			src={img}
			alt="Koodi"
			class:expanded={isExpanded}
			onclick={() => (isExpanded = !isExpanded)}
		/>
	</div>

	<div class="question">
		{kysymys}
	</div>

	{#if vastaukset}
		{#each vastaukset as vastaus}
			<Button
				vastaus={true}
				otsikko={vastaus}
				onclick={() => onkoOikeaVastaus(vastaus)}
				{disabled}
			/>
			<br />
		{/each}
	{/if}
</div>

<style>
	.menikoOikein {
		position: absolute;
		left: 700px;
		top: 30px;
	}
	img.expanded {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		object-fit: contain;
		z-index: 9999;
	}

	.question {
		font-size: 18px;
		background: white;
		color: black;
		padding: 18px;
		margin-bottom: 10px;
		border-radius: 10px;
		text-align: center;
		max-width: 90%;
		width: 550px;
		box-sizing: border-box;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		height: auto;
	}

	.code-block {
		background: #201f1faa;
		max-width: 800px;
		height: 220px;
		margin-bottom: 10px;
		border-radius: 20px;
	}
	.container {
		max-width: 750px;
		overflow: hidden;
		margin: 0px auto;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.container img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	@media (max-width: 600px) {
		.container {
			max-width: 350px;
		}
		.question {
			font-size: 15px;
		}

		img {
			max-width: 100%;
		}
	}
	/*@media (max-width:600px) {
		.container {
			margin-bottom: 100px;
		}
		*/
</style>
