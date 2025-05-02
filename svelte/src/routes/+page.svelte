<script lang="ts">
	import '$lib/fonts/fonts.css';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import { backInOut } from 'svelte/easing';

	let visible = true;

	// Custom slide transition: right on enter, left on leave
	function slideHorizontal(node: Element, { duration = 500 } = {}) {
		const style = getComputedStyle(node);
		const width = parseFloat(style.width);

		return {
			duration,
			easing: backInOut,
			css: (t: number, u: number) => {
				// t: progress (0 → 1) for intro
				// u = 1 - t: progress for outro
				// Enter: translateX(100%) → 0
				// Leave: translateX(0) → -100%
				const isIntro = node.getAttribute('data-transition') === 'in';
				const offset = isIntro
					? (1 - t) * width // right to center
					: -u * width; // center to left

				return `
        transform: translateX(${offset}px);
        opacity: ${t};
      `;
			}
		};
	}

	onMount(() => {
		document.body.className = 'aloitussivu-body';
	});

	//tee sivu pelille ja reititä
</script>

<!--teemavalitsin, montakysymystä, ns asetukset-->

<button on:click={() => (visible = !visible)}> Toggle Question </button>

{#if visible}
	<div
		transition:slideHorizontal
		data-transition="in"
		style="width: 300px; height: 200px; background: lightblue; border: 1px solid;"
	>
		Question Component
	</div>
{/if}

<!--Aloitussivu-->
<div class="body">
	<div class="info">i</div>
	<div>
		<h2>404</h2>
		<h1>IQ Not Found</h1>
		<Button vastaus={false} otsikko="Aloita" disabled={false} onclick={() => goto('/Pelisivu')} />
	</div>
</div>

<style>
	/* Tämä vaikuttaa myös pelisivuun!!!! */
	:global(body.aloitussivu-body) {
		display: flex;
		justify-content: center;
		align-items: center;
		background: url('img/taustakuvakokeilu.png') no-repeat center center fixed black;
		background-size: cover;
		color: white;
	}
	.body {
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		min-height: 100vh;
		font-family: 'Jaro', sans-serif;
		text-align: center;
	}
	h2 {
		color: #7d1313;
		-webkit-text-stroke: 7px #ff0000;
		font-family: 'Jaro';
		font-size: 144px;
		font-style: normal;
		font-weight: 400;
		line-height: 1.2;
		text-shadow:
			1px 1px 15px #ff0000,
			1px 1px 15px #ff0000;
		margin-top: 0px;
		margin-bottom: 5px;
	}

	h1 {
		color: #000;
		-webkit-text-stroke: 7px #ffffff;
		font-family: 'Jaro';
		font-size: 110px;
		font-style: normal;
		font-weight: 400;
		line-height: 1.2;
		text-shadow:
			1px 1px 10px #fff,
			1px 1px 10px #ccc;
		margin-top: 0px;
		margin-bottom: 65px;
	}
	.info {
		position: absolute;
		top: 40px;
		right: 30px;
		width: 50px;
		height: 50px;
		background-color: black;
		border: 3px solid rgb(255, 255, 255);
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		border-radius: 8px;
		color: white;
		font-weight: bold;
		font-family: sans-serif;
		font-size: 42px;
		text-align: center;
		cursor: pointer;
	}
</style>
